import { Component } from '@angular/core';
import { DoctorAppointment } from '../../../models/Appointment/DoctorAppointmentDTOs';
import { DoctorAppointmentsService } from '../../../shared/services/doctor-appointments-service';

@Component({
  selector: 'app-doctor-appointments',
  imports: [],
  templateUrl: './doctor-appointments.html',
  styleUrl: './doctor-appointments.css'
})
export class DoctorAppointments {
  appointments: DoctorAppointment[] = [];
  loading = true;

  constructor(private doctorAppointmentsService: DoctorAppointmentsService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.loading = true;
    this.doctorAppointmentsService.getDoctorAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updateStatus(id: number, status: string) {
    if (!confirm('هل أنت متأكد من تغيير حالة الموعد؟')) return;

    this.doctorAppointmentsService.updateAppointmentStatus(id, status).subscribe({
      next: () => this.loadAppointments(),
      error: () => alert('حدث خطأ أثناء تحديث الحالة')
    });
  }

  formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  }
}
