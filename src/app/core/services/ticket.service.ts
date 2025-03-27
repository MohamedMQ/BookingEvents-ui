import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiService = inject(ApiService);

  protectedTicket(ticketIdOrData: any): Observable<any> {
    console.log(typeof ticketIdOrData);
    if (typeof ticketIdOrData === 'number')
      return this.apiService.delete<any>(`/protected/tickets/${ticketIdOrData}`);
    return this.apiService.post<any>(`/protected/tickets`, ticketIdOrData);
  }
}
