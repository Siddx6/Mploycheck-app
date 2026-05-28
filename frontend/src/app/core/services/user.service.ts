import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from './auth.service';

export interface CreateUserPayload {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'General User';
  department: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<{ users: User[]; total: number }> {
    return this.http.get<{ users: User[]; total: number }>(this.apiUrl);
  }

  getUserById(userId: string): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/${userId}`);
  }

  createUser(payload: CreateUserPayload): Observable<{ message: string; user: User }> {
    return this.http.post<{ message: string; user: User }>(this.apiUrl, payload);
  }

  updateUser(userId: string, payload: Partial<CreateUserPayload>): Observable<{ message: string; user: User }> {
    return this.http.put<{ message: string; user: User }>(`${this.apiUrl}/${userId}`, payload);
  }

  deleteUser(userId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${userId}`);
  }
}