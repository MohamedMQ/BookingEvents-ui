import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // private eventUrl = '/events'

  private apiService = inject(ApiService);

  publicEvents(newPage: number = 0): Observable<any> {
    return this.apiService.get<any>(`/public/events?page=${newPage}`);
  }

  publicEvent(eventId: number): Observable<any> {
    return this.apiService.get<any>(`/public/events/${eventId}`);
  }

  protectedEvents(newPage: number = 0): Observable<any> {
    return this.apiService.get<any>(`/protected/events?page=${newPage}`);
  }

  protectedEvent(eventIdOrformData: any): Observable<any> {
    console.log("TYPE OF EVENTIDORFORMDATA ======> ", typeof eventIdOrformData === 'string');
    
    if (typeof eventIdOrformData === 'string')
      return this.apiService.get<any>(`/protected/events/${eventIdOrformData}`);
    // else
    return this.apiService.post<any>(`/protected/events`, eventIdOrformData);
  }

  getDefaultImage(): Observable<any> {
    return this.apiService.get<any>("/uploads/users/events/default.jpg")
  }
}
