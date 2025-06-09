import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, { withCredentials: true }).pipe(
      tap(() => this.isAuthenticated = true)
    );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      })
    );
  }

  checkAuth() {
    return this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/auth/check`, { withCredentials: true });
  }

  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/user/register`, data, { withCredentials: true });
  }

}
