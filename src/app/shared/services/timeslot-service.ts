import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itimeslot } from '../../models/itimeslot';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {

  private baseUrl = 'http://localhost:5216/api/TimeSlot'; 
  
    constructor(private http: HttpClient) {}
  
    getAvailableTimeSlotsForDoctor(doctorId: number, date: Date): Observable<Itimeslot[]> {
      return this.http.get<Itimeslot[]>(`${this.baseUrl}/available/${doctorId}?date=${date.toISOString().split('T')[0]}`);
    }

}
