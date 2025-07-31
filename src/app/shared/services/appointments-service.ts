import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppointment } from '../../models/iappointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:5216/api/Appointment_'; 

  constructor(private http: HttpClient) {}

  getMyPastAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.baseUrl}/past`);
  }
  getMyUpcomingAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.baseUrl}/upcoming`);
  }
  getMyAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.baseUrl}/get-all-appointments`);
  }

  cancelAppointment(appointmentId: number): Observable<any> {
  return this.http.patch(`/api/appointments/${appointmentId}/cancel`, {});
}
  bookAppointment(appointment: IAppointment): Observable<IAppointment> {
    return this.http.post<IAppointment>(`${this.baseUrl}/book`, appointment);
  }
  getAppointmentById(id: number): Observable<IAppointment> {
    return this.http.get<IAppointment>(`${this.baseUrl}/get-appointment-by-id/${id}`);
  }
  updateAppointment(appointment: IAppointment): Observable<IAppointment> {
    return this.http.put<IAppointment>(`${this.baseUrl}/update-appointment/${appointment.id}`, appointment);
  }
  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-appointment/${id}`);
  }
  getAllAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.baseUrl}/all`);
  }


}
