import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { TicketService } from '../services/ticket.service';

export const ticketGuard: CanMatchFn = (route, state) => {
    const ticketService = inject(TicketService);
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

    return ticketService
      .protectedTicketGet(Number(eventId))
      .pipe(
        map(() => true),
        catchError(() => {
          // console.log("NO TICKET FOUND");
          router.navigate(['/error']);
          return of(false);
        })
      );
};
