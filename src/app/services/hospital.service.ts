import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
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

  getHospitals() {
    const url = `${this.baseUrl}/hospitals`;

    return this.http
      .get<{ ok: boolean; hospitals: Hospital[] }>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; hospitals: Hospital[] }) => resp.hospitals)
      );
  }

  createHospital(name: string) {
    const url = `${this.baseUrl}/hospitals`;

    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(_id: string, name: string) {
    const url = `${this.baseUrl}/hospitals/${_id}`;

    return this.http.put(url, { name }, this.headers);
  }

  deleteHospital(_id: string) {
    const url = `${this.baseUrl}/hospitals/${_id}`;

    return this.http.delete(url, this.headers);
  }
}
