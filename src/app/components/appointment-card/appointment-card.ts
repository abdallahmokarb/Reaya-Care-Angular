import { Component, Input } from '@angular/core';
import { IAppointment } from '.../../../src/app/models/iappointment';
import { AppointmentService } from '../../shared/services/appointments-service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-appointment-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './appointment-card.html',
  styleUrl: './appointment-card.css'
})


export class AppointmentCard {
  @Input() appointment!: IAppointment;
  router: any;

  constructor(private AppointmentService: AppointmentService) {}

  getStatusLabel(status: string): string {
    switch (status) {
      case 'Confirmed': return 'قادم';
      case 'Finished': return 'تم';
      case 'Cancelled': return 'ملغي';
      default: return status;
    }
  }

    getTimeRange(): string {
    return `${this.appointment.startTime} - ${this.appointment.endTime}`;
  }


shouldShowVideoLink(appointment: IAppointment): boolean {
  if (
    appointment.status !== 'Confirmed' ||
    !appointment.videoCallUrl
  ) {
    return false;
  }

  const now = new Date();

  const dateOnly = this.appointment.date.split('T')[0]; // "2025-08-03"

  const start = new Date(`${dateOnly}T${this.appointment.startTime}:00`);
  const end = new Date(`${dateOnly}T${this.appointment.endTime}:00`);

  return now >= start && now <= end;
}







cancelAppointment(appointmentId: number): void {
    if (!confirm('هل أنت متأكد من إلغاء هذا الموعد؟')) return;

    this.AppointmentService.cancelAppointment(this.appointment).subscribe({
      next: () => {
        this.appointment.status = 'Canceled';
        alert('تم إلغاء الموعد بنجاح');
      },
      error: (err) => {
        console.error('خطأ أثناء الإلغاء', err);
        alert('حدث خطأ أثناء الإلغاء');
      }
    });
  }

  // rateDoctor(doctorId: number) {
  //   this.router.navigate(['/all-doctors', doctorId]);
  // }

}