import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../shared/services/payment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  standalone: true,
  templateUrl: './my-payments.html',
  styleUrls: ['./my-payments.css'],
  imports: [CommonModule],
})
export class MyPayments implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  user: any;
  patientId: number = 0;
  selectedAppointment: any = null;
  errorMessage: string | null = null;

  constructor(
    private paymentService: PaymentService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');

    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.patientId = this.user?.patientId || 0;

      if (this.patientId) {
        this.getAppointments();
      }
    }
  }

  getAppointments(): void {
    const url = `http://localhost:5216/api/Appointment_/patient/${this.patientId}/appointments`;
    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        this.appointments = res;
        // filter only Cancelled and NonAttendance
        this.filteredAppointments = res.filter(
          (a) => a.status === 'Cancelled' || a.status === 'NonAttendence'
        );
      },
      error: (err) => {
        console.error('Error loading appointments:', err);
      },
    });
  }

  openRefundModal(appointment: any): void {
    this.selectedAppointment = appointment;
  }

  closeRefundModal(): void {
    this.selectedAppointment = null;
  }

  confirmRefund(): void {
    if (!this.selectedAppointment) return;

    const refundAmountCents = Math.floor(this.selectedAppointment.amount * 100);
    const transactionId = Number(this.selectedAppointment.transactionId);

    const refundData = {
      amountCents: refundAmountCents,
      transactionId: transactionId,
    };

    this.paymentService.refundPayment(refundData).subscribe({
      next: (res) => {
        this.errorMessage = null; // clear error if success

        alert('تم إرسال طلب الاسترداد بنجاح');
        this.closeRefundModal();
        this.getAppointments();

        this.router.navigateByUrl(
          '/dashboard/patient/my-payments/refund-details',
          {
            state: { refund: res },
          }
        );
      },
      error: (err) => {
        console.error('فشل في إرسال طلب الاسترداد', err);

        if (err?.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage =
            'حدث خطأ أثناء تنفيذ الاسترداد , هذة العمليه تم عكسها من قبل , الرجاء متابعة بنكك للتاكد من استلام المبلغ علي بطاقتك البنكية';
        }

        this.closeRefundModal();
      },
    });
  }
}
