import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Idoctor } from '../../models/idoctor';
import { Observable } from 'rxjs/internal/Observable';
import { ISpecialization } from '../../models/ispecialization';
import { IDocument, IDocumentResponse } from '../../models/idocument';

@Injectable({
  providedIn: 'root',
})
export class DoctorInfoService {
  private apiUrl = `${environment.apiBaseUrl}doctor`;
  private apiSpecializationUrl = `${environment.apiBaseUrl}specialization`;
  private apiUploadUrl = `${environment.apiBaseUrl}Document/upload`;
  private getDoctordocInfoUrl = `${environment.apiBaseUrl}Document/doctor`;
  constructor(private http: HttpClient) {}

  getDoctorInfo(doctorId: string): Observable<Idoctor> {
    return this.http.get<Idoctor>(`${this.apiUrl}/${doctorId}`);
  }

  updateDoctorInfo(doctorId: string, doctorData: Idoctor): Observable<Idoctor> {
    return this.http.put<Idoctor>(`${this.apiUrl}/${doctorId}`, doctorData);
  }

  getspecializations(): Observable<ISpecialization[]> {
    return this.http.get<ISpecialization[]>(`${this.apiSpecializationUrl}`);
  }
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUploadUrl}`, formData);
  }
  editfile(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUploadUrl}/edit`, formData);
  }
  getallDocuments(doctorId: string): Observable<IDocumentResponse[]> {
    return this.http.get<IDocumentResponse[]>(
      `${this.getDoctordocInfoUrl}/${doctorId}`
    );
  }
}
