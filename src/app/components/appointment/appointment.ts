import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookAppointmentService } from '../../shared/services/book-appointment';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment.html',
  styleUrls: ['./appointment.css']
})
export class AppointmentComponent implements OnInit {

  appointment = {
    specializationId: null,
    city: '',
    doctorId: null,
    date: '',
    timeSlotId: null
  };

  specializations: any[] = [];
  cities = ['القاهرة', 'الإسكندرية', 'الجيزة'];
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  timeSlots: any[] = [];

  appointmentService = inject(BookAppointmentService);

  ngOnInit(): void {
    this.loadSpecializations();
    this.loadDoctors();
    this.loadTimeSlots();
  }

  loadSpecializations() {
    // Simulate API call
    this.specializations = [
      { id: 1, name: 'باطنة' },
      { id: 2, name: 'جلدية' },
      { id: 3, name: 'عظام' }
    ];
  }

  loadDoctors() {
    // Simulate API call
    this.doctors = [
      { id: 1, fullName: 'د. أحمد سامي', specializationId: 1, city: 'القاهرة' },
      { id: 2, fullName: 'د. سارة محمد', specializationId: 2, city: 'الإسكندرية' },
      { id: 3, fullName: 'د. خالد عبد الله', specializationId: 1, city: 'القاهرة' },
    ];
    this.filterDoctors();
  }

  loadTimeSlots() {
    // Simulate API call
    this.timeSlots = [
      { id: 1, startTime: '10:00 ص', endTime: '10:30 ص' },
      { id: 2, startTime: '11:00 ص', endTime: '11:30 ص' },
      { id: 3, startTime: '12:00 م', endTime: '12:30 م' },
    ];
  }

  filterDoctors() {
    this.filteredDoctors = this.doctors.filter(doc =>
      (!this.appointment.specializationId || doc.specializationId == this.appointment.specializationId) &&
      (!this.appointment.city || doc.city == this.appointment.city)
    );
  }

  bookAppointment() {
    this.appointmentService.bookAppointment(this.appointment).subscribe(
      res => alert('تم الحجز بنجاح'),
      err => alert('حدث خطأ أثناء الحجز')
    );
  }
}
