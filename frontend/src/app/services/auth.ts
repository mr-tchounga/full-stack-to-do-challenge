import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http: //localhost:3000/api';
  
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string;}) {
    return this.http.post('${this.apiUrl}/auth/login', credentials, { withCredentials: true});
  }

  logout() {
    return this.http.post('${this.apiUrl}/auth/logout', {}, { withCredentials: true});
  }

  // checkAuth() {
  //   return this.http.get('${this.apiUrl}/auth/check', { withCredentials: true});
  // }

}
