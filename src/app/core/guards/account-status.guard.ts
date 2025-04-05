import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, of, tap } from 'rxjs';

export const accountStatusGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  return authService
    .accountStatus()
    .pipe(
      tap(res => {
        if (!res.data.currentlyDue.length
            && !res.data.disabledReason
            && res.data.acceptPayments)
          return of(true);
        toastrService.error('Profile requirements not completed', 'Error');
        router.navigate(['/dashboard']);
        return of(false);
      }),
      catchError((err) => {
        toastrService.error(err.error.message, 'Error');
        router.navigate(['/dashboard']);
        return of(false);
      })
    )
};
