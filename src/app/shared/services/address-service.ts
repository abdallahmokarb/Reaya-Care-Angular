import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Igovernment } from '../../igovernment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

     private apiUrl = `${environment.apiBaseUrl}Address/`; 

  constructor(private http: HttpClient) { }

    getAllGovernments(): Observable<Igovernment[]> {
      return this.http.get<Igovernment[]>(`${this.apiUrl}governments`);
    }
  }
