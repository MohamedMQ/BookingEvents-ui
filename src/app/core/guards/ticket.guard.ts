import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { TicketService } from '../services/ticket.service';
import { ToastrService } from 'ngx-toastr';

export const ticketGuard: CanMatchFn = (route, state) => {
    const ticketService = inject(TicketService);
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

    return ticketService
      .protectedTicketGet(Number(eventId))
      .pipe(
        map(() => true),
        catchError(() => {
          taostrService.error('Resource not found', 'Error');
          router.navigate(['/events']);
          return of(false);
        })
      );
};
