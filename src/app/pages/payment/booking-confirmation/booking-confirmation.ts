import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.html',
  standalone: true,
})
export class BookingConfirmation implements OnInit {
  bookingData: any;
  paymentData: any;
  appointmentId: number = 0;

  ngOnInit(): void {
    const stored = sessionStorage.getItem('confirmation');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.bookingData = parsed.booking;
      this.paymentData = parsed.payment;
      this.appointmentId = parsed.appointmentId;
    }
  }
}
