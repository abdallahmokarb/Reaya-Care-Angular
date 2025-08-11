import { Component, OnDestroy, OnInit } from '@angular/core';
import { DoctorAppointmentsService } from '../../../shared/services/doctor-appointments-service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth-service';
import { AppointmentStatus, AppointmentWithDoctorDTO, WeekDays } from '../../../models/Appointment/DoctorAppointmentDTOs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-appointments',
  imports: [CommonModule,RouterModule],
  templateUrl: './doctor-appointments.html',
  styleUrl: './doctor-appointments.css',
})
export class DoctorAppointments implements OnInit {
  appointments: AppointmentWithDoctorDTO[] = [];
  filteredAppointments: AppointmentWithDoctorDTO[] = [];
  loading: boolean = false;
  error: string | null = null;
  doctorId: number | null = null;
  selectedFilter: string = 'all';
  searchTerm: string = '';
  updatingAppointments: Set<number> = new Set();

  AppointmentStatus = AppointmentStatus;

  filterOptions = [
    { value: 'all', label: 'جميع الحجوزات', count: 0 },
    { value: 'today', label: 'اليوم', count: 0 },
    { value: 'confirmed', label: 'مؤكدة', count: 0 },
    { value: 'finished', label: 'منتهية', count: 0 },
    { value: 'nonAttendance', label: 'عدم حضور', count: 0 },
    { value: 'cancelled', label: 'ملغاة', count: 0 }
  ];

  constructor(
    private appointmentService: DoctorAppointmentsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.doctorId = user?.doctorId || null;
    if (this.doctorId) {
      this.loadAppointments();
    } else {
      this.showError('غير قادر على تحميل المواعيد: معرف الطبيب غير متوفر');
    }
  }

  loadAppointments(): void {
    if (!this.doctorId) return;
    
    this.loading = true;
    this.error = null;
    
    this.appointmentService.getDoctorAppointments(this.doctorId).subscribe({
      next: (data) => {
        this.appointments = data.map(appt => ({
          ...appt,
          startTime: new Date(appt.startTime),
          endTime: new Date(appt.endTime),
          createdAt: new Date(appt.createdAt),
          status: appt.status || AppointmentStatus.Confirmed // Default to Confirmed
        })).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        
        this.updateFilterCounts();
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.showError('حدث خطأ أثناء تحميل المواعيد. يرجى المحاولة مرة أخرى.');
        this.loading = false;
      }
    });
  }

  updateStatus(appointmentId: number, newStatus: AppointmentStatus): void {
    if (!this.doctorId) {
      this.showError('معرف الطبيب غير متوفر');
      return;
    }

    this.updatingAppointments.add(appointmentId);
    
    this.appointmentService.updateAppointmentStatus(appointmentId, newStatus, this.doctorId).subscribe({
      next: () => {
        this.showSuccess('تم تحديث حالة الموعد بنجاح');
        this.loadAppointments();
        this.updatingAppointments.delete(appointmentId);
      },
      error: (err) => {
        console.error('Update Error:', err);
        this.showError('حدث خطأ أثناء تحديث الحالة. يرجى المحاولة مرة أخرى.');
        this.updatingAppointments.delete(appointmentId);
      }
    });
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilters();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.appointments];

    // Apply status filter
    if (this.selectedFilter !== 'all') {
      if (this.selectedFilter === 'today') {
        // Filter for today's appointments
        filtered = filtered.filter(appt => this.isToday(appt));
      } else {
        const statusMap: { [key: string]: AppointmentStatus } = {
          'confirmed': AppointmentStatus.Confirmed,
          'finished': AppointmentStatus.Finished,
          'nonAttendance': AppointmentStatus.NonAttendence,
          'cancelled': AppointmentStatus.Cancelled
        };
        filtered = filtered.filter(appt => appt.status === statusMap[this.selectedFilter]);
      }
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(appt => 
        appt.patientName.toLowerCase().includes(searchLower) ||
        appt.patientEmail.toLowerCase().includes(searchLower) ||
        appt.appointmentId.toString().includes(searchLower)
      );
    }

    this.filteredAppointments = filtered;
  }

  updateFilterCounts(): void {
    this.filterOptions.forEach(option => {
      if (option.value === 'all') {
        option.count = this.appointments.length;
      } else if (option.value === 'today') {
        option.count = this.getTodayAppointmentsCount();
      } else {
        const statusMap: { [key: string]: AppointmentStatus } = {
          'confirmed': AppointmentStatus.Confirmed,
          'finished': AppointmentStatus.Finished,
          'nonAttendance': AppointmentStatus.NonAttendence,
          'cancelled': AppointmentStatus.Cancelled
        };
        option.count = this.appointments.filter(appt => appt.status === statusMap[option.value]).length;
      }
    });
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'غير معروف';
    return d.toLocaleString('ar-EG', { 
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatTime(date: Date | string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'غير معروف';
    return d.toLocaleTimeString('ar-EG', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusLabel(status: AppointmentStatus | undefined): string {
    switch (status) {
      case AppointmentStatus.Confirmed: return 'مؤكد';
      case AppointmentStatus.Finished: return 'منتهي';
      case AppointmentStatus.NonAttendence: return 'عدم حضور';
      case AppointmentStatus.Cancelled: return 'ملغى';
      default: return 'غير معروف';
    }
  }

  getStatusColor(status: AppointmentStatus | undefined): string {
    switch (status) {
      case AppointmentStatus.Confirmed: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case AppointmentStatus.Finished: return 'bg-blue-100 text-blue-800 border-blue-200';
      case AppointmentStatus.NonAttendence: return 'bg-red-100 text-red-800 border-red-200';
      case AppointmentStatus.Cancelled: return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getDayFromDate(date: Date | string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'غير معروف';
    const dayIndex = d.getDay();
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[dayIndex];
  }

  canUpdateStatus(appointment: AppointmentWithDoctorDTO): boolean {
    // Only allow status updates for Confirmed appointments
    if (appointment.status !== AppointmentStatus.Confirmed) {
      return false;
    }
    
    // Only allow updates after the appointment end time has passed
    const now = new Date();
    const appointmentEndTime = new Date(appointment.endTime);
    
    return appointmentEndTime <= now;
  }

  isAppointmentPassed(appointment: AppointmentWithDoctorDTO): boolean {
    const now = new Date();
    const appointmentEndTime = new Date(appointment.endTime);
    return appointmentEndTime <= now;
  }

  isAppointmentInProgress(appointment: AppointmentWithDoctorDTO): boolean {
    const now = new Date();
    const appointmentStartTime = new Date(appointment.startTime);
    const appointmentEndTime = new Date(appointment.endTime);
    
    return appointmentStartTime <= now && now < appointmentEndTime;
  }

  getTimeUntilAppointment(appointment: AppointmentWithDoctorDTO): string {
    const now = new Date();
    const appointmentStartTime = new Date(appointment.startTime);
    const diffMs = appointmentStartTime.getTime() - now.getTime();
    
    if (diffMs <= 0) {
      return '';
    }
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 24) {
      const diffDays = Math.floor(diffHours / 24);
      return `خلال ${diffDays} يوم`;
    } else if (diffHours > 0) {
      return `خلال ${diffHours} ساعة و ${diffMinutes} دقيقة`;
    } else {
      return `خلال ${diffMinutes} دقيقة`;
    }
  }

  getAppointmentStatusMessage(appointment: AppointmentWithDoctorDTO): string {
    if (this.isAppointmentInProgress(appointment)) {
      return 'الموعد جاري الآن';
    } else if (this.canUpdateStatus(appointment)) {
      return 'يمكن تحديث الحالة';
    } else if (appointment.status === AppointmentStatus.Confirmed) {
      const timeUntil = this.getTimeUntilAppointment(appointment);
      return timeUntil ? `${timeUntil}` : 'في الانتظار';
    } else {
      return 'تم الانتهاء من الموعد';
    }
  }

  isUpcoming(appointment: AppointmentWithDoctorDTO): boolean {
    return new Date(appointment.startTime) > new Date();
  }

  isToday(appointment: AppointmentWithDoctorDTO): boolean {
    const today = new Date();
    const apptDate = new Date(appointment.startTime);
    return apptDate.toDateString() === today.toDateString();
  }

  private showSuccess(message: string): void {
    // You can replace this with a toast notification service
    alert(message);
  }

  private showError(message: string): void {
    this.error = message;
    // You can replace this with a toast notification service
    alert(message);
  }

  isUpdating(appointmentId: number): boolean {
    return this.updatingAppointments.has(appointmentId);
  }

  getTodayAppointmentsCount(): number {
    const today = new Date();
    return this.appointments.filter(appt => this.isToday(appt)).length;
  }

  getUpcomingAppointmentsCount(): number {
    return this.appointments.filter(appt => this.isUpcoming(appt)).length;
  }

  getInProgressAppointmentsCount(): number {
    return this.appointments.filter(appt => this.isAppointmentInProgress(appt)).length;
  }

  trackByAppointmentId(index: number, appointment: AppointmentWithDoctorDTO): number {
    return appointment.appointmentId;
  }
}