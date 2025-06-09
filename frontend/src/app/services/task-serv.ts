import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  categoryId: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/category';

  constructor(private http: HttpClient) {}

  getAll(categoryId: number): Observable<Task[]> {
    let url = `${this.apiUrl}/${categoryId}/task`;
    return this.http.get<Task[]>(url, { withCredentials: true });
    // return this.http.get<Task[]>(this.apiUrl, { withCredentials: true });
  }
  
  getById(id: number, categoryId: number): Observable<Task> {
    let url = `${this.apiUrl}/${categoryId}/task/${id}`;
    return this.http.get<Task>(url, { withCredentials: true });
  }
  
  create(task: { title: string; description: string; categoryId: number }): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${task.categoryId}/task`, task, { withCredentials: true });
  }

  update(id: number, task: { title: string; description: string; categoryId: number }): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.categoryId}/task/${id}`, task, { withCredentials: true });
  }

  delete(id: number, categoryId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${categoryId}/task/${id}`, { withCredentials: true });
  }
}
