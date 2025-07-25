import { Injectable } from '@angular/core';
import { IRegister } from '../../models/iregister';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = `${environment.apiBaseUrl}Account/register`;
  constructor(private http: HttpClient) { }
  
  registerUser(userData: IRegister) {
    return this.http.post(
      this.apiUrl,
      userData,
      { responseType: 'text' }
    );
  }
}
