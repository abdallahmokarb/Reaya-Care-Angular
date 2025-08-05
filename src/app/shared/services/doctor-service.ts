import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idoctor } from '../../models/idoctor';
import { Idoctordetails } from '../../models/idoctordetails';
import { Idoctorcard } from '../../models/idoctorcard';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = 'http://localhost:5216/api/Doctor'; // 👈 Update this to your real API URL

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<Idoctorcard[]> {
    return this.http.get<Idoctorcard[]>(this.baseUrl);
  }

  getDoctorById(id: number): Observable<Idoctordetails> {
    return this.http.get<Idoctordetails>(`${this.baseUrl}/details/${id}`);
  }
  approveDoctor(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/activate`, {});
  }
  rejectDoctor(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/deactivate`, {});
  }
}
