import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  private baseUrl = 'http://localhost:5216/api/Appointment_/appointment';
  constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

  }

  joinRoom(appointmentId: number) {
    const headers = this.getAuthHeaders();
    return this.http.get<{ url: string }>(
      `${this.baseUrl}/JoinRoom/${appointmentId}`,
      { headers }
    );
  }

  AddDoctorNotes(appointmentId: number, notes: string) {
    const headers = this.getAuthHeaders();
    return this.http.post(
      `${this.baseUrl}/AddNotes/${appointmentId}`,
      { notes },
      { headers }
    );
  }
}
