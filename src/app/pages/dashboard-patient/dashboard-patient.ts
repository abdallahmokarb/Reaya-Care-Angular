import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  templateUrl: './dashboard-patient.html',
  imports: [CommonModule],
})
export class DashboardPatient implements AfterViewInit {
  user: any;
  ngOnInit(): void {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
    }
  }

  displayRoles(): string {
    if (!this.user || !this.user.roles) return '';
    const roles = this.user.roles.filter((role: any) => role !== 'Patient');
    return roles.length === 0 ? 'مستخدم جديد' : roles.join(', ');
  }

  ngAfterViewInit() {
    // Bar Chart Testb
    new Chart(document.getElementById('specialtyChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: ['طب القلب', 'طب الأطفال', 'طب العيون'],
        datasets: [
          {
            label: 'عدد الزيارات',
            data: [3, 2, 1],
            backgroundColor: '#16a34a',
            borderColor: '#15803d',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });

    // Pie Chart
    new Chart(document.getElementById('statusChart') as HTMLCanvasElement, {
      type: 'pie',
      data: {
        labels: ['مؤكد', 'عدم حضور', 'غير مدفوع'],
        datasets: [
          {
            data: [3, 1, 1],
            backgroundColor: ['#00c950', '#fb2c36', '#ffdf20'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
