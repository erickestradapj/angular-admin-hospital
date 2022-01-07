import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) {}

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get<boolean>(`${this.baseUrl}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((err) => of(false))
      );
  }

  createUser(formData: RegisterForm): Observable<RegisterForm> {
    return this.http
      .post<RegisterForm>(`${this.baseUrl}/users`, formData)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  login(formData: LoginForm): Observable<LoginForm> {
    return this.http
      .post<LoginForm>(`${this.baseUrl}/login`, formData)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  loginGoogle(token: any) {
    return this.http
      .post(`${this.baseUrl}/login/google`, { token })
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }
}
