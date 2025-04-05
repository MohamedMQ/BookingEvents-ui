import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { userAction } from '../../store/actions/user.action';

export const authGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);
  const toastrService = inject(ToastrService);

  return authService
    .protectedProfile()
    .pipe(
      tap(res => {
        const {id, name, email} = res.data;
        const user = {id, name, email}
        store.dispatch(userAction({user}));
        return of(true);
      }),
      catchError((err) => {
        // toastrService.error("You are not authenticated", 'Error');
        router.navigate(['/events']);
        return of(false);
      })
    )
};
