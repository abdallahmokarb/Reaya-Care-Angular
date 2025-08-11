import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  paymentIdFromBackend: number | null = null;

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
    const paymobCallbackUrl =
      'https://care.runasp.net/api/payment/paymob-callback';

    this.http
      .get<{ message: string; paymentId: number }>(paymobCallbackUrl, {
        params,
      })
      .subscribe({
        next: (res) => {
          console.log('Payment sent to backend:', res);
          this.paymentIdFromBackend = res.paymentId;
          this.isLoading = false;
          this.isSuccess = this.paymentData.Success;

          if (this.paymentData.Success) {
            this.bookAppointment();
          }
        },
        error: (err) => {
          console.error('Failed to send payment to backend:', err);
          this.isLoading = false;
          this.isSuccess = false;
        },
      });
  }

  bookAppointment() {
    const bookingData = localStorage.getItem('yourBooking');
    const userData = sessionStorage.getItem('user');

    if (!bookingData || !userData) {
      console.error('missing booking data or user data');
      return;
    }

    try {
      const parsedBooking = JSON.parse(bookingData);
      const parsedUser = JSON.parse(userData);

      const payload = {
        doctorId: parsedBooking.doctorId,
        timeSlotId: parsedBooking.slot.timeSlotId,
        patientId: parsedUser.patientId,
        notes: 'booking notes',
        paymentId: this.paymentIdFromBackend,
      };

      console.log(payload);

      const bookUrl =
        'https://care.runasp.net/api/Appointment_/book-appointment';

      this.http.post(bookUrl, payload).subscribe({
        next: (res: any) => {
          console.log('appointment booked successfully', res);
          this.isSuccess = true;

          const confirmation = {
            booking: parsedBooking,
            payment: this.paymentData,
            appointmentId: res.appointmentId || res.id,
            doctorId: parsedBooking.doctorId,
            amount: this.paymentData.AmountCents / 100, // convert to cents
          };

          sessionStorage.setItem('confirmation', JSON.stringify(confirmation));

          // redirect to confirmation
          window.location.href = '/booking-confirmation';
        },
        error: (err) => {
          console.error('failed to book appointment:', err);
          this.isSuccess = false;
        },
      });
    } catch (err) {
      console.error('error parsing booking data:', err);
    }
  }
}
