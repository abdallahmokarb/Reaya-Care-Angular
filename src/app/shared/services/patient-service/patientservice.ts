import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Ipatient } from '../../../models/ipatient';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Patientservice {


  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getPatientUrl(patientId: string): Observable<Ipatient> {
    return this.http.get<Ipatient>(`${this.apiUrl}patient/${patientId}`);
  }
  updatePatient(patientData: Ipatient): Observable<Ipatient> {
    return this.http.put<Ipatient>(`${this.apiUrl}patient/UpdateProfile`, patientData);
  }
}
