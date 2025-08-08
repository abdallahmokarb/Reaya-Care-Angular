import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../../shared/interfaces/doctor';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit, AfterViewInit {
  isOpen: boolean = true;
  user: any = {};
  doctorId: number = 0;
  ratings: any[] = [];
  ratingCount: number = 0;
  averageRating: number = 0;
  balance: number = 0;
  views: number = 0;
  appointments: any[] = [];
  mostVisitedPatients: {
    patientId: number;
    name: string;
    visitCount: number;
  }[] = [];
  statusCode: number | null = null;
  statusText: string | null = null;
  fullName: string | null = null;
  service: string | null = null;
  specialization: string | null = null;
  profilePictureUrl: string | null = null;

  finishedCount = 0;
  confirmedCount = 0;
  cancelledCount = 0;
  nonAttendanceCount = 0;
  constructor(private http: HttpClient) {}

  closeModal() {
    this.isOpen = false;
  }

  ngOnInit(): void {
    const userJson =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
      this.doctorId = this.user?.doctorId;

      if (this.doctorId) {
        this.getDoctorRatings(this.doctorId);
        this.getDoctorInfo();
        this.updateDoctorStatus();
      }
    }
  }

  ngAfterViewInit(): void {
    this.renderBarChart();
    this.renderPieChart();
    this.loadViews(this.doctorId);
    this.getAppointments(this.doctorId);
  }

  private renderBarChart(): void {
    new Chart(document.getElementById('specialtyChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          {
            label: 'الذكور',
            data: [2],
            backgroundColor: '#194ad6',
            borderColor: '#24ace4',
            borderWidth: 1,
            barThickness: 50,
          },
          {
            label: 'الإناث',
            data: [1],
            backgroundColor: '#f514a0',
            borderColor: '#ff7cad',
            borderWidth: 1,
            barThickness: 50,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
          x: { stacked: false },
        },
      },
    });
  }

  private renderPieChart(): void {
    new Chart(document.getElementById('statusChart') as HTMLCanvasElement, {
      type: 'pie',
      data: {
        labels: ['مؤكد', 'عدم حضور', 'ملغي'],
        datasets: [
          {
            data: [3, 0, 0],
            backgroundColor: ['#00a543', '#e4a300', '#d50a1c'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  getDoctorRatings(doctorId: number): void {
    this.http
      .get<any[]>(`http://localhost:5216/api/Rating/doctor/${doctorId}`)
      .subscribe({
        next: (res) => {
          this.ratings = res;
          this.ratingCount = res.length;

          // rating value avg
          if (this.ratingCount > 0) {
            const total = res.reduce(
              (sum, rating) => sum + rating.ratingValue,
              0
            );
            this.averageRating = total / this.ratingCount;
          } else {
            this.averageRating = 0;
          }
        },
        error: (err) => {
          console.error('failed to fetch rating', err);
        },
      });
  }
  getDoctorInfo(): void {
    this.http
      .get<any>(`http://localhost:5216/api/Doctor/${this.doctorId}`)
      .subscribe({
        next: (res) => {
          this.balance = res.balance;
        },
        error: (err) => {
          console.error('failed to fetch doctor info', err);
        },
      });
  }
  loadViews(doctorId: number) {
    this.http
      .get<{ views: number }>(
        `http://localhost:5216/api/Doctor/${doctorId}/view`
      )
      .subscribe({
        next: (res) => {
          this.views = res.views;
        },
        error: (err) => {
          console.error('err views', err);
        },
      });
  }

  getAppointments(doctorId: number) {
    this.http
      .get<any[]>(
        `http://localhost:5216/api/Doctor/doctor/${doctorId}/appointments`
      )
      .subscribe({
        next: (res) => {
          console.log('Appointments:', res);
          this.appointments = res;

          // Count appointments
          const finishedCount = res.filter(
            (app) => app.status === 'Finished'
          ).length;
          console.log('Finished Appointments Count:', finishedCount);

          this.finishedCount = res.filter(
            (a: any) => a.status === 'Finished'
          ).length;
          this.confirmedCount = res.filter(
            (a: any) => a.status === 'Confirmed'
          ).length;
          this.cancelledCount = res.filter(
            (a: any) => a.status === 'Cancelled'
          ).length;
          this.nonAttendanceCount = res.filter(
            (a: any) => a.status === 'NonAttendence'
          ).length;
        },
        error: (err) => {
          console.error('err loading appointments', err);
        },
      });
  }

  updateDoctorStatus() {
    this.http
      .get<Doctor>(`http://localhost:5216/api/Doctor/${this.doctorId}`, {})
      .subscribe({
        next: (res) => {
          this.statusCode = res.status ?? null;
          this.fullName = res.fullName ?? null;
          this.service = res.service ?? null;
          this.specialization = res.specialization ?? null;
          this.profilePictureUrl = res.profilePictureUrl ?? null;
          if (this.statusCode !== null) {
            this.statusText = this.getStatusText(this.statusCode);
          }
        },
        error: (err) => {
          console.error('err ', err);
        },
      });
  }

  getStatusText(status: number | null): string {
    if (status === null) {
      return 'Nىo status available';
    }
    switch (status) {
      case 0:
        return 'قيد المراجعة (حسابك في انتظار الموافقة)';
      case 1:
        return 'مفعل (حسابك نشط)';
      case 2:
        return 'مرفوض (تم رفض طلب انضمامك)';
      case 3:
        return 'موقوف مؤقتاً (حسابك موقوف بشكل مؤقت)';
      case 4:
        return 'معطل (عفواً .. حسابك معطل بشكل دائم)';
      default:
        return '';
    }
  }
}
