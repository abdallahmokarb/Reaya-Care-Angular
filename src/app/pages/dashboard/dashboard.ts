import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements AfterViewInit {
  ngAfterViewInit() {
    new Chart(document.getElementById('specialtyChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: ['طب الأطفال'],
        datasets: [
          {
            label: 'الذكور',
            data: [34, 25],
            backgroundColor: '#16a34a',
            borderColor: '#15803d',
            borderWidth: 1,
          },
          {
            label: 'الإناث',
            data: [11, 51],
            backgroundColor: '#4ade80',
            borderColor: '#22c55e',
            borderWidth: 1,
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

    // Pie Chart
    new Chart(document.getElementById('statusChart') as HTMLCanvasElement, {
      type: 'pie',
      data: {
        labels: ['مؤكد', 'عدم حضور', 'غير مدفوع'],
        datasets: [
          {
            data: [110, 20, 9],
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
