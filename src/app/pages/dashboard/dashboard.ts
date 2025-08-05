import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

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
      }
    }
  }

  ngAfterViewInit(): void {
    this.renderBarChart();
    this.renderPieChart();
    this.loadViews(this.doctorId);
  }

  private renderBarChart(): void {
    new Chart(document.getElementById('specialtyChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: ['طب القلب'],
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

          // ratingValue avg
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
          console.error('failed to fetch ratings:', err);
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
          console.error('Error fetching views:', err);
        },
      });
  }
}
