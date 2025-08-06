import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { PaymentService } from '../../shared/services/payment';
import { Payment } from '../../shared/interfaces/payment';
import { IAppointment } from '../../models/iappointment';
import { AppointmentService } from '../../shared/services/appointments-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-patient.html',
})
export class DashboardPatient implements OnInit, AfterViewInit {
  user: any;
  appointments: IAppointment[] = [];
  loading = true;
  error: string = '';
  payments: Payment[] = [];
  userId = '';
  patientId: number = 0;
  confirmedCount = 0;
  cancelledCount = 0;
  finishedCount = 0;
  nonAttendenceCount = 0;

  constructor(
    private appointmentService: AppointmentService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.finishedCount = this.appointments.filter(
      (a) => a.status === 'Confirmed'
    ).length;

    console.log(this.finishedCount);

    const storedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userId = this.user?.id || '';
      this.patientId = this.user?.patientId || 0;

      if (this.patientId) {
        this.loadPaymentsByPatientId(this.patientId);
      }

      if (this.userId) {
        this.paymentService.getPaymentsByUserId(this.userId).subscribe({
          next: (res) => (this.payments = res),
          error: (err) => console.error('Error loading payments', err),
        });
      }
    }
    this.appointmentService.getMyAppointments().subscribe({
      next: (data) => {
        this.appointments = data;

        // Count statuses
        this.confirmedCount = data.filter(
          (a) => a.status === 'Confirmed'
        ).length;
        this.cancelledCount = data.filter(
          (a) => a.status === 'Cancelled'
        ).length;
        this.finishedCount = data.filter((a) => a.status === 'Finished').length;
        this.nonAttendenceCount = data.filter(
          (a) => a.status === 'NonAttendence'
        ).length;

        console.log({
          Confirmed: this.confirmedCount,
          Cancelled: this.cancelledCount,
          Finished: this.finishedCount,
          NonAttendence: this.nonAttendenceCount,
        });

        this.loading = false;
      },
      error: () => {
        this.error = 'فشل تحميل المواعيد';
        this.loading = false;
      },
    });
  }

  displayRoles(): string {
    if (!this.user?.roles || !Array.isArray(this.user.roles))
      return 'مستخدم جديد';
    const roles = this.user.roles.filter((role: string) => role !== 'Patient');
    return roles.length ? roles.join(', ') : 'مستخدم جديد';
  }

  ngAfterViewInit() {
    const specialtyChart = document.getElementById(
      'specialtyChart'
    ) as HTMLCanvasElement;
    const statusChart = document.getElementById(
      'statusChart'
    ) as HTMLCanvasElement;

    if (specialtyChart) {
      new Chart(specialtyChart, {
        type: 'bar',
        data: {
          labels: ['طب القلب'],
          datasets: [
            {
              label: 'عدد الزيارات',
              data: [1],
              backgroundColor: '#16a34a',
              borderColor: '#15803d',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }

    if (statusChart) {
      new Chart(statusChart, {
        type: 'pie',
        data: {
          labels: ['مؤكد', 'عدم حضور', 'ملغي'],
          datasets: [
            {
              data: [1, 0, 0],
              backgroundColor: ['#00c950', '#fc6b00', '#f21872'],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
  }

  private loadPaymentsByPatientId(patientId: number): void {
    this.paymentService.getPaymentsByUserId(patientId).subscribe({
      next: (res) => {
        console.log(res);
        this.payments = res;
      },
      error: (err) => {
        console.error('خطأ أثناء تحميل المدفوعات:', err);
      },
    });
  }
}
