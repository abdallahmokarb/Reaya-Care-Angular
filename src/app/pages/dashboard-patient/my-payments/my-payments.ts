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
        console.log(res);
        this.appointments = res;
        // filter only Cancelled
        this.filteredAppointments = res.filter((a) => a.status === 'Cancelled');
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
        this.errorMessage = null;

        const doctorId = this.selectedAppointment.doctorId;
        const originalAmount = this.selectedAppointment.amount;

        this.http
          .post(
            `http://localhost:5216/api/doctor/${doctorId}/deduct-balance`,
            originalAmount
          )
          .subscribe({
            next: (deductRes: any) => {
              console.log('تم الخصم من رصيد الدكتور', deductRes);

              // alert('تم إرسال طلب الاسترداد وتم الخصم من الدكتور بنجاح');
              this.closeRefundModal();
              this.getAppointments();

              // race condition
              setTimeout(() => {
                this.router.navigateByUrl(
                  '/dashboard/patient/my-payments/refund-details',
                  {
                    state: { refund: res },
                  }
                );
              }, 100);
            },

            error: (err) => {
              console.error('فشل في خصم المبلغ من الدكتور', err);
              this.errorMessage =
                'تم الاسترداد، لكن فشل في خصم المبلغ من الدكتور';
              alert(this.errorMessage);
              this.closeRefundModal();
            },
          });
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
