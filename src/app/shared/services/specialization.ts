import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpecializationDTO } from '../../models/SpecializationDTO';

@Injectable({
  providedIn: 'root'
})



export class Specialization {
   private apiUrl = 'https://your-api-endpoint.com/api/specializations'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  getAllSpecializations(): Observable<SpecializationDTO[]> {
    return this.http.get<SpecializationDTO[]>(this.apiUrl);
  }

  getSpecializationById(id: number): Observable<SpecializationDTO> {
    return this.http.get<SpecializationDTO>(`${this.apiUrl}/${id}`);
  }

  getDoctorsBySpecialization(specializationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${specializationId}/doctors`);
  }
}
