import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, of, tap } from 'rxjs';

export const accountStatusGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService
    .accountStatus()
    .pipe(
      tap(res => {
        // console.log("SUCCESS AUTHENTICATING USER ", res);
        if (!res.data.currentlyDue.length
            && !res.data.disabledReason
            && res.data.acceptPayments)
          return of(true);
        router.navigate(['/dashboard']);
        return of(false);
      }),
      catchError((err) => {
        // console.log("ERROR AUTHENTICATING USER ", err);
        router.navigate(['/dashboard']);
        return of(false);
      })
    )
};
