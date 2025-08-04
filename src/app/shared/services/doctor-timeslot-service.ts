import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {  map, Observable } from 'rxjs';
import { DoctorTimeSlotDTO } from '../../models/DoctorTimeSlot/DoctorTimeSlotDTO';
import { DoctorTimeSlotCreateDTO } from '../../models/DoctorTimeSlot/DoctorTimeSlotCreateDTO';


@Injectable({
  providedIn: 'root'
})
export class DoctorTimeslotService {

  private baseUrl = `${environment.apiBaseUrl}DoctorTimeSlot`;

  constructor(private http: HttpClient) { }

  getDoctorTimeSlots(doctorId: number): Observable<DoctorTimeSlotDTO[]> {
    return this.http.get<DoctorTimeSlotDTO[]>(`${this.baseUrl}/doctor/${doctorId}`)
      .pipe(
        map(slots => slots.map(slot => ({
          ...slot,
          // Quick fix: remove 3-hour UTC shift when displaying
          startTime: new Date(new Date(slot.startTime).getTime()),
          endTime: new Date(new Date(slot.endTime).getTime())
        })))
      );
  }

  createTimeSlot(dto: DoctorTimeSlotCreateDTO): Observable<DoctorTimeSlotDTO> {
    // Send as-is (no manual adjustment)
    const adjustedDto = { ...dto };
    return this.http.post<DoctorTimeSlotDTO>(this.baseUrl, adjustedDto);
  }

  updateTimeSlot(id: number, dto: DoctorTimeSlotCreateDTO): Observable<void> {
    // Send as-is (no manual adjustment)
    const adjustedDto = { ...dto };
    return this.http.put<void>(`${this.baseUrl}/${id}`, adjustedDto);
  }

  deleteTimeSlot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  activateTimeSlot(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/activate/${id}`, {});
  }

  deactivateTimeSlot(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/deactivate/${id}`, {});
  }
}

