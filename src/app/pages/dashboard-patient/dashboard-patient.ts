import { Component, OnInit } from '@angular/core';
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
export class DashboardPatient implements OnInit {
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
          error: (err) => console.error('err', err),
        });
      }
    }

    this.appointmentService.getMyAppointments().subscribe({
      next: (data) => {
        this.appointments = data;

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

        this.renderStatusChart();

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

  private loadPaymentsByPatientId(patientId: number): void {
    this.paymentService.getPaymentsByUserId(patientId).subscribe({
      next: (res) => {
        this.payments = res;
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }

  private renderStatusChart(): void {
    const statusChart = document.getElementById(
      'statusChart'
    ) as HTMLCanvasElement;
    const statusBarChart = document.getElementById(
      'statusBarChart'
    ) as HTMLCanvasElement;

    const labels = ['مؤكد', 'منتهي', 'عدم حضور', 'ملغي'];
    const dataValues = [
      this.confirmedCount,
      this.finishedCount,
      this.nonAttendenceCount,
      this.cancelledCount,
    ];
    const colors = ['#00c950', '#007bff', '#fc6b00', '#f21872'];

    // Pie chart
    if (statusChart) {
      new Chart(statusChart, {
        type: 'pie',
        data: {
          labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: colors,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }

    // Bar chart
    if (statusBarChart) {
      new Chart(statusBarChart, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'عدد الحالات',
              data: dataValues,
              backgroundColor: colors,
              borderWidth: 1,
              barThickness: 40,
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
  }
}
