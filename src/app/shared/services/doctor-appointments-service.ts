import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { AppointmentStatus, AppointmentWithDoctorDTO, UpdateAppointmentStatusDTO } from '../../models/Appointment/DoctorAppointmentDTOs';

@Injectable({
  providedIn: 'root'
})
export class DoctorAppointmentsService {
  private apiUrl = `${environment.apiBaseUrl}Appointment_`; 

  constructor(private http: HttpClient) {}

  getDoctorAppointments(doctorId: number): Observable<AppointmentWithDoctorDTO[]> {
    return this.http.get<AppointmentWithDoctorDTO[]>(`${this.apiUrl}/doctor/${doctorId}/appointments`);
  }

  updateAppointmentStatus(appointmentId: number, status: AppointmentStatus, doctorId: number): Observable<any> {
    const dto: UpdateAppointmentStatusDTO = { 
      status: status,
      doctorId: doctorId 
    };
    console.log('Updating appointment status:', { appointmentId, dto });
    return this.http.put<any>(`${this.apiUrl}/doctor/appointments/${appointmentId}/status`, dto);
  }
}
