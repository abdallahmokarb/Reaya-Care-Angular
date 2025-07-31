import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Igovernment } from '../../models/igovernment';
import { ICity } from '../../models/icity';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

     private apiUrl = `${environment.apiBaseUrl}Address/`; 

  constructor(private http: HttpClient) { }

    getAllGovernments(): Observable<Igovernment[]> {
      return this.http.get<Igovernment[]>(`${this.apiUrl}governments`);
    }

    getCitiesByGovernmentId(governmentId: number): Observable<ICity[]> {
      return this.http.get<ICity[]>(`${this.apiUrl}cityByGovernment/${governmentId}`);
    }
  }
