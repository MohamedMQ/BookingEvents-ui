import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleExclamation,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs';
import { InputFocusDirective } from '../../../core/directives/input-focus.directive';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    InputFocusDirective
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  faSpinner = faSpinner;
  faCircleExclamation = faCircleExclamation;
  isSubmited: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  @Output() tabChange = new EventEmitter<string>();

  private authService = inject(AuthService);
  private rb = inject(FormBuilder);

  form: FormGroup = this.rb.group({
    name: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{3,20}$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
        ),
      ],
    ],
  });

  onCreateAccount() {
    this.isSubmited = true;
    if (this.form.invalid) return;
    this.isLoading = true;
    const { name, email, password } = this.form.value;
    const userDetails = { name, email, password };
    this.authService
      .publicRegister(userDetails)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('User registered successfully' + response);
          this.tabChange.emit('signin');
        },
        error: (err) => {
          console.log('Registed failed' + err);
          this.errorMessage = 'registration failed, pleaese try again';
        },
      });
  }

  switchToSignIn(): void {
    this.tabChange.emit('signin');
  }
}
