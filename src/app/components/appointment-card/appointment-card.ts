import { Component, Input } from '@angular/core';
import { IAppointment } from '.../../../src/app/models/iappointment';
import { AppointmentService } from '../../shared/services/appointments-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appointment-card',
  imports: [CommonModule],
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
      case 'Canceled': return 'ملغي';
      default: return status;
    }
  }

    getTimeRange(): string {
    return `${this.appointment.startTime} - ${this.appointment.endTime}`;
  }




cancelAppointment(appointmentId: number): void {
    if (!confirm('هل أنت متأكد من إلغاء هذا الموعد؟')) return;

    this.AppointmentService.cancelAppointment(appointmentId).subscribe({
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

  rateDoctor(doctorId: number) {
    this.router.navigate(['/rate-doctor', doctorId]);
  }

}