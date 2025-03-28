import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, Renderer2, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { selectUserFeature, selectUserId } from '../../../store/selectors/user.selector';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    FontAwesomeModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  
  @Output() showModal = new EventEmitter<boolean>();
  
  private renderer = inject(Renderer2);
  private store = inject(Store);
  private router = inject(Router);

  user$ = this.store.select(selectUserFeature);

  showHideModal(): void {
    this.renderer.addClass(document.body, 'overflow-hidden');
    this.showModal.emit(true);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToMyEvents(): void {
    this.router.navigate(['/events/my-events']);
  }
}
