import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../shared/services/appointments-service';
import { IAppointment } from '../../../models/iappointment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.html',
  styleUrls: ['./my-appointments.css'],
  imports: [CommonModule, RouterModule],
})
export class MyAppointments implements OnInit {
  appointments: IAppointment[] = [];
  loading = true;
  error = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.getMyAppointments().subscribe({
      next: (data) => {
        console.log(data);
        this.appointments = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'فشل تحميل المواعيد';
        this.loading = false;
      },
    });
  }
}
