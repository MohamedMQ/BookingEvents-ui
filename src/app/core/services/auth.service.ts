import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private authUrl = '/auth'

  private apiService = inject(ApiService);

  publicLogin(credentials: any): Observable<any> {
    return this.apiService.post<any>(`/public/auth/login`, credentials);
  }

  publicRegister(userDetails: any): Observable<any> {
    return this.apiService.post<any>(`/public/auth/register`, userDetails);
  }

  protectedProfile(): Observable<any> {
    return this.apiService.get<any>(`/protected/auth/profile`);
  }

  accountStatus(): Observable<any> {
    return this.apiService.get<any>(`/protected/account/status`);
  }

  accountLink(): Observable<any> {
    return this.apiService.get<any>(`/protected/account/link`);
  }

  dashboardLink(): Observable<any> {
    return this.apiService.get<any>(`/protected/dashboard/link`);
  }

  protectedLogout(): Observable<any> {
    return this.apiService.get<any>(`/protected/auth/logout`);
  }
}
