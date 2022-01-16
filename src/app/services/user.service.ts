import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { GetUsers } from '../interfaces/get-users.interface';

declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.base_url;
  public auth2: any;
  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  public get token(): string {
    return localStorage.getItem('token') || '';
  }

  public get uid(): string {
    return this.user.uid || '';
  }

  public get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
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

  // TODO: Important!! (models "users")
  validateToken(): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.baseUrl}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, img = '', name, role, uid } = resp.user;
          this.user = new User(name, email, '', img, google, role, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((err) => of(false))
      );
  }

  createUser(formData: RegisterForm): Observable<RegisterForm> {
    return this.http
      .post<RegisterForm>(`${this.baseUrl}/users`, formData)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  updateProfile(data: { email: string; name: string; role: string }) {
    data = {
      ...data,
      role: this.user.role || '',
    };

    return this.http.put(`${this.baseUrl}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
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

  getUsers(from: number = 0): Observable<GetUsers> {
    const url = `${this.baseUrl}/users?from=${from}`;

    return this.http.get<GetUsers>(url, this.headers).pipe(
      map((resp) => {
        const users: User[] = resp.users.map(
          (user) =>
            new User(
              user.name,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );

        return {
          total: resp.total,
          users,
        };
      })
    );
  }
}
