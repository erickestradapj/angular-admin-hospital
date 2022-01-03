import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) {}

  createUser(formData: RegisterForm): Observable<RegisterForm> {
    return this.http.post<RegisterForm>(`${this.baseUrl}/users`, formData);
  }
}
