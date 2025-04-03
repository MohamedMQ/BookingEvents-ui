import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
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

  protectedEventsOwn(newPage: number = 0): Observable<any> {
    return this.apiService.get<any>(`/protected/events/me?page=${newPage}`);
  }

  protectedEvent(eventIdOrformData: any): Observable<any> {
    if (typeof eventIdOrformData === 'number')
      return this.apiService.get<any>(`/protected/events/${eventIdOrformData}`);
    return this.apiService.post<any>(`/protected/events`, eventIdOrformData);
  }

  deleteProtectedEvent(eventId: number): Observable<any> {
    return this.apiService.delete<any>(`/protected/events/${eventId}`);
  }

  protectedEventPut(eventId: number, formData: any): Observable<any> {
    return this.apiService.put<any>(`/protected/events/${eventId}`, formData)
  }

  getDefaultImage(): Observable<any> {
    return this.apiService.get<any>("/uploads/users/events/default.jpg")
  }
}
