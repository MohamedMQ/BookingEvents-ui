import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, Renderer2, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faMagnifyingGlass, faRightFromBracket, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { selectUserFeature } from '../../../store/selectors/user.selector';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { userAction } from '../../../store/actions/user.action';
import { EventService } from '../../../core/services/event.service';
import { FormsModule } from '@angular/forms';
import { searchAction } from '../../../store/actions/search.action';

@Component({
  selector: 'app-navbar',
  imports: [
    FontAwesomeModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faRightFromBracket = faRightFromBracket;
  faSpinner = faSpinner;

  @Output() showModal = new EventEmitter<boolean>();

  private renderer = inject(Renderer2);
  private store = inject(Store);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);

  user$ = this.store.select(selectUserFeature);

  showDropDown: boolean = false;
  signingOut: boolean = false;
  searchTerm: string = "";
  isFocused: boolean = false;

  showHideModal(): void {
    this.renderer.addClass(document.body, 'overflow-hidden');
    this.showModal.emit(true);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToMyTickets(): void {
    this.router.navigate(['/tickets/my-tickets']);
  }

  dropdown() {
    this.showDropDown = !this.showDropDown;
  }

  signOut() {
    this.signingOut = true;
    this.authService.protectedLogout().subscribe({
      next: (res) => {
        let user: any = {id: 0, name: '', email: ''};
        this.store.dispatch(userAction({ user }));
        this.showDropDown = false;
        this.signingOut = false
        this.toastrService.success(res.message, 'Success');
      },
      error: (err) => {
        this.toastrService.error(err.error.message, 'Error');
      }
    })
  }

  searchEvents() {
    let search: any = { searchTerm: this.searchTerm };
    this.store.dispatch(searchAction({ search }));
    this.router.navigate(['/events']);
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }
}
