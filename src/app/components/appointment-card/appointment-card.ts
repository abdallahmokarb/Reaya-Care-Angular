import { Component, Input } from '@angular/core';
import { IAppointment } from '.../../../src/app/models/iappointment';
import { AppointmentService } from '../../shared/services/appointments-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-appointment-card',
  imports: [CommonModule],
  templateUrl: './appointment-card.html',
  styleUrl: './appointment-card.css'
})


export class AppointmentCard {
  @Input() appointment!: IAppointment;

  constructor(private AppointmentService: AppointmentService) {}

  getStatusLabel(status: string): string {
    switch (status) {
      case 'Scheduled': return 'قادم';
      case 'Completed': return 'تم';
      case 'Canceled': return 'ملغي';
      default: return 'غير معروف';
    }
}

cancelAppointment(): void {
    if (!confirm('هل أنت متأكد من إلغاء هذا الموعد؟')) return;

    this.AppointmentService.cancelAppointment(this.appointment.id).subscribe({
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
}