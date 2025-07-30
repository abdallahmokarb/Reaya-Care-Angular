import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISpecialization } from '../../models/ispecialization';

@Injectable({
  providedIn: 'root'
})



export class Specialization {
   private apiUrl = `${environment.apiBaseUrl}Specialization`; // Update with actual API URL

  constructor(private http: HttpClient) { }

  getAllSpecializations(): Observable<ISpecialization[]> {
    return this.http.get<ISpecialization[]>(this.apiUrl);
  }

  getSpecializationById(id: number): Observable<ISpecialization> {
    return this.http.get<ISpecialization>(`${this.apiUrl}/${id}`);
  }

}
