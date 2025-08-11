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
  finishedCount = 0;
  confirmedCount = 0;
  cancelledCount = 0;
  nonAttendanceCount = 0;

  statusCode: number | null = null;
  statusText: string | null = null;
  fullName: string | null = null;
  service: string | null = null;
  specialization: string | null = null;
  profilePictureUrl: string | null = null;

  chartsReady = {
    balance: false,
    views: false,
    ratings: false,
    appointments: false,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const userJson =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
      this.doctorId = this.user?.doctorId;

      if (this.doctorId) {
        this.getDoctorRatings(this.doctorId);
        this.getDoctorInfo();
        this.loadViews(this.doctorId);
        this.getAppointments(this.doctorId);
        this.updateDoctorStatus();
      }
    }
  }

  ngAfterViewInit(): void {
    // الرسم سيتم عند وصول كل البيانات
  }

  private renderBarChart(): void {
    new Chart(document.getElementById('barChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          {
            label: 'عدد المشاهدات',
            data: [this.views],
            backgroundColor: '#0093b4',
            borderColor: '#00b1d3',
            borderWidth: 1,
            barThickness: 50,
          },
          {
            label: 'عدد التقييمات',
            data: [this.ratingCount],
            backgroundColor: '#4938e0',
            borderColor: '#605dff',
            borderWidth: 1,
            barThickness: 50,
          },
          {
            label: 'متوسط التقييم',
            data: [this.averageRating],
            backgroundColor: '#cc0062',
            borderColor: '#f43198',
            borderWidth: 1,
            barThickness: 50,
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

  private renderPieChart(): void {
    new Chart(document.getElementById('pieChart') as HTMLCanvasElement, {
      type: 'pie',
      data: {
        labels: ['مؤكد', 'عدم حضور', 'ملغي', 'منتهي'],
        datasets: [
          {
            data: [
              this.confirmedCount,
              this.nonAttendanceCount,
              this.cancelledCount,
              this.finishedCount,
            ],
            backgroundColor: ['#00a543', '#e4a300', '#d50a1c', '#194ad6'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  private updateChartsIfReady() {
    if (
      this.chartsReady.views &&
      this.chartsReady.ratings &&
      this.chartsReady.appointments
    ) {
      this.renderBarChart();
      this.renderPieChart();
    }
  }

  getDoctorRatings(doctorId: number): void {
    this.http
      .get<any[]>(`https://care.runasp.net/api/Rating/doctor/${doctorId}`)
      .subscribe({
        next: (res) => {
          this.ratings = res;
          this.ratingCount = res.length;

          if (this.ratingCount > 0) {
            const total = res.reduce(
              (sum, rating) => sum + rating.ratingValue,
              0
            );
            this.averageRating = total / this.ratingCount;
          } else {
            this.averageRating = 0;
          }

          console.log('Ratings:', this.ratingCount, 'Avg:', this.averageRating);
          this.chartsReady.ratings = true;
          this.updateChartsIfReady();
        },
        error: (err) => {
          console.error('failed to fetch rating', err);
        },
      });
  }

  getDoctorInfo(): void {
    this.http
      .get<any>(`https://care.runasp.net/api/Doctor/${this.doctorId}`)
      .subscribe({
        next: (res) => {
          this.balance = res.balance;
          console.log('Balance:', this.balance);
        },
        error: (err) => {
          console.error('failed to fetch doctor info', err);
        },
      });
  }

  loadViews(doctorId: number) {
    this.http
      .get<{ views: number }>(
        `https://care.runasp.net/api/Doctor/${doctorId}/view`
      )
      .subscribe({
        next: (res) => {
          this.views = res.views;
          console.log('Views:', this.views);
          this.chartsReady.views = true;
          this.updateChartsIfReady();
        },
        error: (err) => {
          console.error('err views', err);
        },
      });
  }

  getAppointments(doctorId: number) {
    this.http
      .get<any[]>(
        `https://care.runasp.net/api/Doctor/doctor/${doctorId}/appointments`
      )
      .subscribe({
        next: (res) => {
          this.appointments = res;
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

          console.log('Appointments counts:', {
            finished: this.finishedCount,
            confirmed: this.confirmedCount,
            cancelled: this.cancelledCount,
            nonAttendance: this.nonAttendanceCount,
          });

          this.chartsReady.appointments = true;
          this.updateChartsIfReady();
        },
        error: (err) => {
          console.error('err loading appointments', err);
        },
      });
  }

  updateDoctorStatus() {
    this.http
      .get<Doctor>(`https://care.runasp.net/api/Doctor/${this.doctorId}`)
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
      return 'لا توجد حالة متاحة';
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
  closeModal() {
    this.isOpen = false;
  }
}
