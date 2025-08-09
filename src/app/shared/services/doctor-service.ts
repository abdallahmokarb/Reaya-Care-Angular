import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idoctor } from '../../models/idoctor';
import { Idoctordetails } from '../../models/idoctordetails';
import { Idoctorcard } from '../../models/idoctorcard';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = 'http://localhost:5216/api/Doctor'; //   Update this to your real API URL

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<Idoctorcard[]> {
    return this.http.get<Idoctorcard[]>(this.baseUrl);
  }

  getAlldDoctorsByStatus(): Observable<Idoctorcard[]> {
    return this.http.get<Idoctorcard[]>(`${this.baseUrl}/allDoctors`);
  }
  getDoctorById(id: number): Observable<Idoctordetails> {
    return this.http.get<Idoctordetails>(`${this.baseUrl}/details/${id}`);
  }
  approveDoctor(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/approve`, {});
  }
  rejectDoctor(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/reject`, {});
  }
  pendingDoctor(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/pending`, {});
  }
  suspendDoctor(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/suspend`, {});
  }
  deactivateDoctor(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/deactivate`, {});
  }

  updateDoctorBalance(doctorId: number, amount: number) {
    return this.http.put(
      `${this.baseUrl}/${doctorId}/balance?amount=${amount}`,
      null
    );
  }
  getDoctorCount(): Observable<number> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`,
    });

    return this.http.get<number>(`${this.baseUrl}/count`, { headers });
  }
}
