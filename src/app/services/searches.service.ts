import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SearchesService {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) {}

  public get token(): string {
    return localStorage.getItem('token') || '';
  }

  public get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformUsers(results: any[]): User[] {
    return results.map(
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
  }

  public search(type: 'users' | 'doctors' | 'hospitals', term: string) {
    const url = `${this.baseUrl}/todo/collection/${type}/${term}`;

    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(resp.results);

          default:
            return [];
        }
      })
    );
  }
}
