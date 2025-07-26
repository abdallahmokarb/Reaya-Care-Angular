import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Idoctor } from '../../models/idoctor';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DoctorInfoService {

  private apiUrl = `${environment.apiBaseUrl}doctor`;
  constructor(private http: HttpClient) { }


  getDoctorInfo(doctorId: string): Observable<Idoctor> {
    return this.http.get<Idoctor>(`${this.apiUrl}/${doctorId}`);
  }
}
