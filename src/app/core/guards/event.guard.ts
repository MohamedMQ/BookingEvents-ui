import { inject } from '@angular/core';
import { Router, CanMatchFn, CanActivate, CanActivateFn } from '@angular/router';
import { EventService } from '../services/event.service';
import { catchError, of, map } from 'rxjs';

export const eventGuard: CanMatchFn = (route, state) => {
  const eventService = inject(EventService);
  const router = inject(Router);

  const eventId = Number(state[state.length - 1]?.path);

  if (typeof eventId !== 'number') {
    router.navigate(['/error']);
    return of(false);
  }

  if (!eventId || isNaN(Number(eventId)) || Number(eventId) <= 0) {
    router.navigate(['/error']);
    return of(false);
  }

  return eventService.publicEvent(Number(eventId)).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/error']);
      return of(false);
    })
  );
};
