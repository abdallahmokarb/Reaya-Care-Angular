import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { RouterModule } from '@angular/router';
import { SystemInfoService } from '../../shared/services/system-info';
import { Ipatient } from '../../models/ipatient';
import { Patientservice } from '../../shared/services/patient-service/patientservice';
import { DoctorService } from '../../shared/services/doctor-service';
import { AdminDTO } from '../../models/Admin/AdminDTOs';
import { AdminService } from '../../shared/services/admin-service';

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
  balance: number | null = null;
  patients: Ipatient[] = [];
  patientsCount: number = 0;
  doctorCount = 0;
  adminsCount: number = 0;
  admins: AdminDTO[] = [];
  pendingDoctorsCount = 0;
  suspendedDoctorsCount = 0;
  todayDate: string = '';

  constructor(
    private systemInfoService: SystemInfoService,
    private patientService: Patientservice,
    private doctorService: DoctorService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.suspendedDoctorsCount = doctors.filter(
          (d) => d.status === 3
        ).length;
      },
      error: (err) => console.error('err', err),
    });
    this.doctorService.getAlldDoctorsByStatus().subscribe({
      next: (doctors) => {
        this.pendingDoctorsCount = doctors.filter((d) => d.status === 0).length;
      },
      error: (err) => console.error('err', err),
    });

    this.adminService.getAllAdmins().subscribe({
      next: (data) => {
        this.admins = data;
        this.adminsCount = this.admins.length;
      },
      error: (err) => {},
    });

    this.doctorService.getDoctorCount().subscribe({
      next: (count) => (this.doctorCount = count),
      error: (err) => console.error('err', err),
    });
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.patientsCount = data.length;
      },
      error: (error) => {
        console.error('err loading patients:', error);
        this.patientsCount = 0;
      },
    });

    this.systemInfoService.getSystemInfo().subscribe({
      next: (data) => {
        const num = Number(data);
        this.balance = isNaN(num) ? 0 : +num.toFixed(2);
        this.drawChart();

        console.log('Balance:', this.balance);
      },
      error: (err) => console.error('err fetching balance', err),
    });
    const storedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userId = this.user?.id || '';
    }

    const today = new Date();
    this.todayDate = today.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  ngAfterViewInit(): void {}
  drawChart() {
    const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
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
            data: [0, 0, 0, 0, 0, 0, 0, this.balance, 0, 0, 0, 0],
            fill: true,
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, 'rgba(0, 166, 62,0.5)');
              gradient.addColorStop(1, 'rgba(0, 165, 62,0.1)');
              return gradient;
            },
            borderColor: 'rgba(22,163,74,1)',
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: (ctx) => {
              const index = ctx.dataIndex;
              return index === 7 ? 'rgba(22,163,74,1)' : '#fff';
            },
            pointBorderColor: (ctx) => {
              const index = ctx.dataIndex;
              return index === 7 ? '#146c43' : '#3B82F6';
            },
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff',
              font: { size: 14 },
            },
          },
          tooltip: {
            backgroundColor: '#1E3A8A',
            titleColor: '#fff',
            bodyColor: '#fff',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#E0F2FE',
            },
          },
          x: {
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
