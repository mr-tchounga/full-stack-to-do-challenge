import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/category';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`, { withCredentials: true });
  }
  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }


  create(category: { title: string }): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category, { withCredentials: true });
  }

  update(id: number, category: { title: string }): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
