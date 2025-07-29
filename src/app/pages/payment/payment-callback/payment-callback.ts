import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-callback',
  templateUrl: './payment-callback.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class PaymentCallbackComponent implements OnInit {
  paymentData: any = {};
  isLoading = true;
  countdown = 5;
  isSuccess = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.paymentData = {
        Id: params['id'],
        Success: params['success'] === 'true',
        AmountCents: +params['amount_cents'],
        Message: params['data.message'] || '',
        CardType: params['source_data.sub_type'] || '',
        Pan: params['source_data.pan'] || '',
        Hmac: params['hmac'] || '',
        Date: params['created_at'] || '',
      };

      const backendParams = new HttpParams()
        .set('Id', this.paymentData.Id)
        .set('Success', this.paymentData.Success)
        .set('AmountCents', this.paymentData.AmountCents)
        .set('Message', this.paymentData.Message)
        .set('CardType', this.paymentData.CardType)
        .set('Pan', this.paymentData.Pan)
        .set('Hmac', this.paymentData.Hmac)
        .set('Date', this.paymentData.Date);

      this.sendToBackend(backendParams);
    });
  }

  sendToBackend(params: HttpParams) {
    const apiUrl = 'http://localhost:5216/api/payment/paymob-callback';

    this.http.get(apiUrl, { params }).subscribe({
      next: (res) => {
        console.log('Payment sent to backend:', res);
        this.isLoading = false;
        this.isSuccess = this.paymentData.Success;
      },
      error: (err) => {
        console.error('Failed to send payment to backend:', err);
        this.isLoading = false;
        this.isSuccess = false;
      },
    });
  }
}
