import { inject } from '@angular/core';
import { Router, CanMatchFn, CanActivate, CanActivateFn } from '@angular/router';
import { EventService } from '../services/event.service';
import { catchError, of, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const eventGuard: CanMatchFn = (route, state) => {
  const eventService = inject(EventService);
  const router = inject(Router);
  const taostrService = inject(ToastrService);

  const eventId = Number(state[state.length - 1]?.path);

  if (typeof eventId !== 'number') {
    taostrService.error('Resource not found', 'Error');
    router.navigate(['/events']);
    return of(false);
  }

  if (!eventId || isNaN(Number(eventId)) || Number(eventId) <= 0) {
    taostrService.error('Resource not found', 'Error');
    router.navigate(['/events']);
    return of(false);
  }

  return eventService.publicEvent(Number(eventId)).pipe(
    map(() => true),
    catchError(() => {
      taostrService.error('Resource not found', 'Error');
      router.navigate(['/events']);
      return of(false);
    })
  );
};
