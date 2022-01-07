import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';

declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.base_url;
  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '464448232482-i832666japgaklpc2jkvlulogbpad6cu.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

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
