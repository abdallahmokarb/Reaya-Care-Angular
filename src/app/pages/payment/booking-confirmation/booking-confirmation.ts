import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.html',
  standalone: true,
  imports: [RouterModule],
})
export class BookingConfirmation implements OnInit {
  bookingData: any;
  paymentData: any;
  appointmentId: number = 0;
  doctorId: number = 0;
  amount: number = 0;
  userName: string = '';

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
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      this.userName = userObj.userName;
    }
  }

  updateDoctorBalance() {
    const apiUrl = `https://care.runasp.net/api/Doctor/${this.doctorId}/balance?amount=${this.amount}`;

    this.http.put(apiUrl, {}).subscribe({
      next: () => {
        console.log('Doctor balance updated successfully');
      },
      error: (err) => {
        console.error('Error updating balance:', err);
      },
    });
  }
  printDetails(): void {
    window.print();
  }
}
