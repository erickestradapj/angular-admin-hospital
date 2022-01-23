import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
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

  getDoctors() {
    const url = `${this.baseUrl}/doctors`;

    return this.http
      .get<{ ok: boolean; doctors: Doctor[] }>(url, this.headers)
      .pipe(map((resp: { ok: boolean; doctors: Doctor[] }) => resp.doctors));
  }

  createDoctor(doctor: { name: string; hospital: string }) {
    const url = `${this.baseUrl}/doctors`;

    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor) {
    const url = `${this.baseUrl}/doctors/${doctor._id}`;

    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(_id: string) {
    const url = `${this.baseUrl}/doctors/${_id}`;

    return this.http.delete(url, this.headers);
  }
}
