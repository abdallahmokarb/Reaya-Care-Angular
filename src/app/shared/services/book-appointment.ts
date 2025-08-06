import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookAppointmentService {
  constructor(private http: HttpClient) {}

  bookAppointment(data: any): Observable<any> {
    return this.http.post('/api/appointments/book', data);
  }
}
