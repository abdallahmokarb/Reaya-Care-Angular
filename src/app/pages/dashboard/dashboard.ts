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
  isOpen: boolean = true;

  closeModal() {
    this.isOpen = false;
  }

  user: any;
  ngOnInit(): void {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
    }
  }

  ngAfterViewInit() {
    new Chart(document.getElementById('specialtyChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: ['طب الأطفال'],
        datasets: [
          {
            label: 'الذكور',
            data: [59, 25],
            backgroundColor: '#194ad6',
            borderColor: '#24ace4',
            borderWidth: 1,
            barThickness: 50,
          },
          {
            label: 'الإناث',
            data: [40, 51],
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

    // Pie Chart
    new Chart(document.getElementById('statusChart') as HTMLCanvasElement, {
      type: 'pie',
      data: {
        labels: ['مؤكد', 'عدم حضور', 'غير مدفوع'],
        datasets: [
          {
            data: [110, 20, 9],
            backgroundColor: ['#007b35', '#b70011', '#d69400'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
