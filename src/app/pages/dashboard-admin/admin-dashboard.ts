import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboard implements OnInit, AfterViewInit {
  user: any;
  loading = true;
  userId = '';

  constructor() {}

  ngOnInit(): void {
    const storedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userId = this.user?.id || '';
    }
  }

  ngAfterViewInit(): void {
    const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!canvas) return;

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [
          'يناير',
          'فبراير',
          'مارس',
          'أبريل',
          'مايو',
          'يونيو',
          'يوليو',
          'أغسطس',
          'سبتمبر',
          'أكتوبر',
          'نوفمبر',
          'ديسمبر',
        ],
        datasets: [
          {
            label: 'الرصيد (بالجنية)',
            data: [0, 0, 0, 0, 0, 0, 0, 2250, 0, 0, 0, 12],
            fill: true,
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, 'rgba(0, 166, 62,0.5)');
              gradient.addColorStop(1, 'rgba(0, 165, 62,0.1)');
              return gradient;
            },
            borderColor: 'rgba(22,163,74,1)',
            tension: 0.4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#3B82F6',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff',
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            backgroundColor: '#1E3A8A',
            titleColor: '#fff',
            bodyColor: '#fff',
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#E0F2FE',
            },
          },
          y: {
            ticks: {
              color: '#E0F2FE',
            },
          },
        },
      },
    });
  }

  displayRoles(): string {
    if (!this.user?.roles || !Array.isArray(this.user.roles)) return '';
    const roles = this.user.roles.filter((role: string) => role !== 'Patient');
    return roles.length ? roles.join(', ') : '';
  }
}
