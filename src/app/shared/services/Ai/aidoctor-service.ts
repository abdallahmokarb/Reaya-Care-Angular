import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AidoctorService {
  private apiUrl = `${environment.apiBaseUrl}Transcribe/AudioToText`; 
  constructor(private http: HttpClient) { }

  getDoctorDatasuggest(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }
}
