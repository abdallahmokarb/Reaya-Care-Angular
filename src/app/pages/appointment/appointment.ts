import { Component, OnInit } from '@angular/core';
import { IAppointment } from '../../models/iappointment';
import { AppointmentService } from '../../shared/services/appointments-service';
import { Router } from '@angular/router';
import { AppointmentCard } from '../../components/appointment-card/appointment-card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'appointment',
  standalone: true,
  imports: [CommonModule, AppointmentCard], 
  templateUrl: './appointment.html',
})
export class Appointment implements OnInit {
  Appointment: IAppointment[] = [];
  previousAppointments: IAppointment[] = [];
  upcomingAppointments: IAppointment[] = [];
  isLoading = true;

  constructor(private appointmentService: AppointmentService,
    private router: Router) {}

   ngOnInit(): void {
    console.log('upcomingAppointments:', this.upcomingAppointments);
   console.log('previousAppointments:', this.previousAppointments);

  this.isLoading = true;

  this.appointmentService.getMyAppointments().subscribe({
    next: (appointments) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.upcomingAppointments = appointments.filter(a => {
        const date = new Date(a.date);
        date.setHours(0, 0, 0, 0);
        return date >= today;
      });

      this.previousAppointments = appointments.filter(a => {
        const date = new Date(a.date);
        date.setHours(0, 0, 0, 0);
        return date < today;
      });

      this.isLoading = false;
      this.Appointment = appointments; 
    },
    error: (err) => {
      console.error('Error fetching appointments:', err);
      this.isLoading = false; 
    },
  });
}




  loadAppointments(): void {
    this.isLoading = true;

    // Get upcoming & past appointments together
    this.appointmentService.getMyUpcomingAppointments().subscribe({
      next: (upcoming) => {
        this.upcomingAppointments = upcoming;

        // nested inside to load both together
        this.appointmentService.getMyPastAppointments().subscribe({
          next: (past) => {
            this.previousAppointments = past;
            this.isLoading = false;
          },
          error: () => this.isLoading = false
        });

      },
      error: () => this.isLoading = false
    });
  }

  navigateToPayment(): void {
    this.router.navigate(['/payment']);
  }

  bookNewAppointment(): void {
    this.router.navigate(['/all-doctors']);
  }





}
