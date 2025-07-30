import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Ipatient } from '../../../models/ipatient';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Patientservice {


  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getPatientUrl(patientId: string): Observable<Ipatient> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Ipatient>(`${this.apiUrl}patient/${patientId}`, { headers });
  }
  updatePatient(patientData: Ipatient): Observable<Ipatient> {
      const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  });

  return this.http.put<Ipatient>(
    `${this.apiUrl}patient/UpdateProfile`,
    patientData,
    { headers }
  );
  }
}
