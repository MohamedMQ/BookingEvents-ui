import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { userAction } from '../../store/actions/user.action';

export const publicAuthGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
    const store = inject(Store);
  
    return authService
      .protectedProfile()
        .pipe(
          tap(res => {
            console.log("SUCCESS AUTHENTICATING USER ", res);
            const {id, name, email} = res.data;
            const user = {id, name, email}
            store.dispatch(userAction({user}));
            return of(true);
          }),
          catchError((err) => {
            console.log("ERROR AUTHENTICATING USER ", err);
            const user = {id: 0, name: '', email: ''}
            store.dispatch(userAction({user}));
            return of(true);
          })
        )
};
