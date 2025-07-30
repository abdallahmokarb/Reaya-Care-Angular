import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = 'http://localhost:5216/api/Payment';

  constructor(private http: HttpClient) {}

  createPayment(bookingDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Create`, bookingDetails);
  }
}
