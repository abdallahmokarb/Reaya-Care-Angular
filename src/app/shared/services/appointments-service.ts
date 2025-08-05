import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppointment } from '../../models/iappointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:5216/api/Patient'; 

  constructor(private http: HttpClient) {}


  
  getMyPastAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.baseUrl}/appointments/past`);
  }
  getMyUpcomingAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.baseUrl}/appointments/upcoming`);
  }
  getMyAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(`${this.baseUrl}/GetAllAppointments`);
  }





  cancelAppointment(app: IAppointment): Observable<any> {
  return this.http.patch(`/api/appointments/CancelAppointment`, app);
}
//   bookAppointment(appointment: IAppointment): Observable<IAppointment> {
//     return this.http.post<IAppointment>(`${this.baseUrl}/book`, appointment);
//   }
//   getAppointmentById(id: number): Observable<IAppointment> {
//     return this.http.get<IAppointment>(`${this.baseUrl}/get-appointment-by-id/${id}`);
//   }
//   updateAppointment(appointment: IAppointment): Observable<IAppointment> {
//     return this.http.put<IAppointment>(`${this.baseUrl}/update-appointment/${appointment}`, appointment);
//   }
//   deleteAppointment(id: number): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/delete-appointment/${id}`);
//   }
//   getAllAppointments(): Observable<IAppointment[]> {
//     return this.http.get<IAppointment[]>(`${this.baseUrl}/all`);
//   }


}
