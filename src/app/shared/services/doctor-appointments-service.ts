import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorAppointment } from '../../models/Appointment/DoctorAppointmentDTOs';

@Injectable({
  providedIn: 'root'
})
export class DoctorAppointmentsService {
  private baseUrl = `${environment.apiBaseUrl}Appointment/`; 
  
    constructor(private http: HttpClient) {}
  
    getDoctorAppointments(): Observable<DoctorAppointment[]> {
      return this.http.get<DoctorAppointment[]>(`${this.baseUrl}/doctor/my-appointments`);
    }
  
    updateAppointmentStatus(id: number, status: string): Observable<any> {
      return this.http.put(`${this.baseUrl}/doctor/appointments/${id}/status`, { status });
    }
}
