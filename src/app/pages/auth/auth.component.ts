import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Output, Renderer2 } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    SignUpComponent,
    SignInComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  currentTab: string = "signin";

  @Output() showModal = new EventEmitter<boolean>();

  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);

  hideModal(): void {
    this.renderer.removeClass(document.body, 'overflow-hidden');
    this.showModal.emit(false);
    this.cdr.detectChanges();
  }
}
