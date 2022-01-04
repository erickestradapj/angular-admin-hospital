import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) {}

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
