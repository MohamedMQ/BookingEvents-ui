import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiService = inject(ApiService);

  initializePayment(ticketId: number): Observable<any> {
    return this.apiService.get<any>(`/protected/payments/${ticketId}`)
  }
}
