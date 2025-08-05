import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.html',
  standalone: true,
})
export class BookingConfirmation implements OnInit {
  bookingData: any;
  paymentData: any;
  appointmentId: number = 0;
  doctorId: number = 0;
  amount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const stored = sessionStorage.getItem('confirmation');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.bookingData = parsed.booking;
      this.paymentData = parsed.payment;
      this.appointmentId = parsed.appointmentId;
      this.doctorId = parsed.doctorId;
      this.amount = parsed.amount;

      this.updateDoctorBalance();
    }
  }

  updateDoctorBalance() {
    const apiUrl = `http://localhost:5216/api/Doctor/${this.doctorId}/balance?amount=${this.amount}`;

    this.http.put(apiUrl, {}).subscribe({
      next: () => {
        console.log('Doctor balance updated successfully');
      },
      error: (err) => {
        console.error('Error updating balance:', err);
      },
    });
  }
}
