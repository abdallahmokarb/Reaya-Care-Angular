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
  isLoading = true;

  constructor(private appointmentService: AppointmentService,
    private router: Router) {}

   ngOnInit(): void {

  this.isLoading = true;

  this.appointmentService.getMyAppointments().subscribe({
    next: (appointments) => {
      this.isLoading = false;
      this.Appointment = appointments;
    },
    error: (err) => {
      console.error('Error fetching appointments:', err);
      this.isLoading = false; 
    },
  });
}


  navigateToPayment(): void {
    this.router.navigate(['/payment']);
  }

  bookNewAppointment(): void {
    this.router.navigate(['/all-doctors']);
  }


  selectedTab: 'upcoming' | 'cancelled' | 'finished' = 'upcoming';

  get filteredAppointments(): IAppointment[] {
    switch (this.selectedTab) {
      case 'upcoming':
        return this.Appointment.filter(a => a.status === 'Confirmed');
      case 'cancelled':
        return this.Appointment.filter(a => a.status === 'Cancelled');
      case 'finished':
        return this.Appointment.filter(a => a.status === 'Finished');
      default:
        return [];
    }
  }



}
