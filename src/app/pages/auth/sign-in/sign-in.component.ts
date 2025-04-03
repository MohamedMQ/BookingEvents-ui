import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs';
import { Store } from '@ngrx/store';
import { userAction } from '../../../store/actions/user.action';
import { InputFocusDirective } from '../../../core/directives/input-focus.directive';

@Component({
  selector: 'app-sign-in',
  imports: [
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
    InputFocusDirective
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  @Output() tabChange = new EventEmitter<string>();
  @Output() hideModal: EventEmitter<void> = new EventEmitter<void>();

  isSubmited: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  faCircleExclamation = faCircleExclamation;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private store = inject(Store);

  form: FormGroup = this.fb.group({
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

  onSignIn() {
    this.isSubmited = true;
    if (this.form.invalid) return;
    this.isLoading = true;
    const { email, password } = this.form.value;
    // console.log(email, password);
    const userDetails = { email, password };
    this.authService
      .publicLogin(userDetails)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          // console.log('User logged successfully' + this.store.user.id);
          // this.store.updateUser(response.data);
          // console.log('User logged successfully' + this.store.user.id);

          let user = response.data;
          this.store.dispatch(userAction({ user }));
          this.hideModal.emit();
        },
        error: (err) => {
          // console.log('loging failed' + err);
          this.errorMessage = 'login failed, pleaese try again';
        },
      });
  }

  switchToSignUp(): void {
    this.tabChange.emit('signup');
  }
}
