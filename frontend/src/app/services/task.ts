import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  // ajoute d'autres champs si besoin (ex: createdAt, status, etc)
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getAll(categoryId?: number): Observable<Task[]> {
    let url = this.apiUrl;
    if (categoryId) url += `/category/${categoryId}`;
    return this.http.get<Task[]>(url, { withCredentials: true });
  }

  getById(id: number, categoryId?: number): Observable<Task> {
    let url = `${this.apiUrl}/${id}`;
    if (categoryId) url += `/category/${categoryId}`;
    return this.http.get<Task>(url, { withCredentials: true });
  }

  create(task: { title: string; description: string; categoryId: number }): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, { withCredentials: true });
  }

  update(id: number, task: { title: string; description: string; categoryId: number }): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, { withCredentials: true });
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
