import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../shared/services/payment';
import { Payment } from '../../../shared/interfaces/payment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  templateUrl: './my-payments.html',
  styleUrls: ['./my-payments.css'],
  imports: [CommonModule],
})
export class MyPayments implements OnInit {
  user: any;
  userId: string = '';
  patientId: number = 0;
  payments: Payment[] = [];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    const storedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userId = this.user?.id || '';
      this.patientId = this.user?.patientId || 0;

      if (this.patientId) {
        this.loadPaymentsByPatientId(this.patientId);
      }
    }
  }

  private loadPaymentsByPatientId(patientId: number): void {
    this.paymentService.getPaymentsByUserId(patientId).subscribe({
      next: (res) => {
        this.payments = res;
      },
      error: (err) => {
        console.error('خطأ اثناء تحميل المدفوعات', err);
      },
    });
  }
}
