import { CommonModule, DatePipe } from '@angular/common';
import {  Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DoctorTimeslotService } from '../../../shared/services/doctor-timeslot-service';
import { AuthService } from '../../../shared/services/auth-service';
import { DoctorTimeSlotDTO } from '../../../models/DoctorTimeSlot/DoctorTimeSlotDTO';
import { ActivatedRoute } from '@angular/router';
import { DoctorTimeSlotCreateDTO } from '../../../models/DoctorTimeSlot/DoctorTimeSlotCreateDTO';
import { WeekDays } from '../../../models/DoctorTimeSlot/WeekDays';

@Component({
  selector: 'app-doctor-timeslots',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  providers: [DatePipe],
  templateUrl: './doctor-timeslots.html',
  styleUrl: './doctor-timeslots.css'
})
export class DoctorTimeslots implements OnInit {
  timeSlots: DoctorTimeSlotDTO[] = [];
  loading = false;
  showModal = false;
  editingSlot: DoctorTimeSlotDTO | null = null;
  currentDoctorId: number;
  
  // Form data
  formData: TimeSlotForm = {
    selectedDate: '',
    startTime: '',
    endTime: ''
  };

  // Arabic day names mapping
  arabicDays: { [key: string]: string } = {
    'Sunday': 'الأحد',
    'Monday': 'الإثنين',
    'Tuesday': 'الثلاثاء',
    'Wednesday': 'الأربعاء',
    'Thursday': 'الخميس',
    'Friday': 'الجمعة',
    'Saturday': 'السبت'
  };

  constructor(
    private timeSlotService: DoctorTimeslotService,
    private authService: AuthService
  ) {
    // Get doctor ID from your existing auth service
    const user = this.authService.getUser();
    this.currentDoctorId = user?.doctorId || 0;
    
    // If no doctor ID found, redirect to login or show error
    if (!this.currentDoctorId) {
      console.error('لم يتم العثور على معرف الطبيب');
      this.authService.logout();
      return;
    }
  }

  ngOnInit(): void {
    this.loadTimeSlots();
    this.initializeForm();
  }

  initializeForm(): void {
    const today = new Date();
    // Format date properly for input
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    
    this.formData = {
      selectedDate: `${year}-${month}-${day}`,
      startTime: '09:00',
      endTime: '10:00'
    };
  }

  loadTimeSlots(): void {
    this.loading = true;
    this.timeSlotService.getDoctorTimeSlots(this.currentDoctorId)
      .subscribe({
        next: (slots) => {
          this.timeSlots = slots;
          this.loading = false;
        },
        error: (error) => {
          console.error('خطأ في تحميل المواعيد:', error);
          this.loading = false;
          
          // Handle unauthorized access
          if (error.status === 401 || error.status === 403) {
            alert('انتهت صلاحية الجلسة. سيتم إعادة توجيهك لتسجيل الدخول.');
            this.authService.logout();
          }
        }
      });
  }

  openAddModal(): void {
    this.editingSlot = null;
    this.initializeForm();
    this.showModal = true;
  }

  openEditModal(slot: DoctorTimeSlotDTO): void {
    this.editingSlot = slot;
    
    // Parse the received datetime and convert to local time for editing
    const startDate = new Date(slot.startTime);
    const endDate = new Date(slot.endTime);
    
    console.log('Received times for editing:', {
      startTime: slot.startTime,
      endTime: slot.endTime,
      parsedStart: startDate.toString(),
      parsedEnd: endDate.toString()
    });
    
    // Format date for input (YYYY-MM-DD) - use local date
    const year = startDate.getFullYear();
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const day = startDate.getDate().toString().padStart(2, '0');
    
    this.formData = {
      selectedDate: `${year}-${month}-${day}`,
      startTime: this.formatTimeForInput(startDate),
      endTime: this.formatTimeForInput(endDate)
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingSlot = null;
    this.initializeForm();
  }

  saveTimeSlot(): void {
    if (!this.validateForm()) return;

    const createDto = this.buildCreateDTO();
    this.loading = true;
    
    if (this.editingSlot) {
      // تحديث موعد موجود
      this.timeSlotService.updateTimeSlot(this.editingSlot.doctorTimeSlotId, createDto)
        .subscribe({
          next: () => {
            this.loadTimeSlots();
            this.closeModal();
            alert('تم تحديث الموعد بنجاح');
          },
          error: (error) => {
            console.error('خطأ في تحديث الموعد:', error);
            this.loading = false;
            this.handleError(error);
          }
        });
    } else {
      // إنشاء موعد جديد
      this.timeSlotService.createTimeSlot(createDto)
        .subscribe({
          next: () => {
            this.loadTimeSlots();
            this.closeModal();
            alert('تم إنشاء الموعد بنجاح');
          },
          error: (error) => {
            console.error('خطأ في إنشاء الموعد:', error);
            this.loading = false;
            this.handleError(error);
          }
        });
    }
  }

  buildCreateDTO(): DoctorTimeSlotCreateDTO {
    // Parse the selected date without timezone conversion
    const dateParts = this.formData.selectedDate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed
    const day = parseInt(dateParts[2]);
    
    // Create start datetime in local timezone (Egypt)
    const [startHour, startMinute] = this.formData.startTime.split(':');
    // const startDateTime = new Date(year, month, day, parseInt(startHour), parseInt(startMinute), 0, 0);
    
    // Create end datetime in local timezone (Egypt)
    const [endHour, endMinute] = this.formData.endTime.split(':');
    // const endDateTime = new Date(year, month, day, parseInt(endHour), parseInt(endMinute), 0, 0);
    
    // Construct the local time ISO format without "Z"
    const formatLocal = (h: string, m: string) =>
      `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${h.padStart(2, '0')}:${m.padStart(2, '0')}:00`;


    const startTime = formatLocal(startHour, startMinute);
    const endTime = formatLocal(endHour, endMinute);

    // Get day of week enum value
    // const dayOfWeek = this.getDayOfWeekEnum(startDateTime.getDay());
    const dayOfWeek = this.getDayOfWeekEnum(new Date(year, month, day).getDay());

    // console.log('Sending times:', {
    //   startTime: startDateTime.toISOString(),
    //   endTime: endDateTime.toISOString(),
    //   localStart: startDateTime.toString(),
    //   localEnd: endDateTime.toString()
    // });

    return {
      doctorId: this.currentDoctorId,
      startTime: startTime,
      endTime: endTime,
      dayOfWeek: dayOfWeek
    };
  }

  deleteTimeSlot(slot: DoctorTimeSlotDTO): void {
    if (!confirm('هل أنت متأكد من حذف هذا الموعد؟')) return;

    this.timeSlotService.deleteTimeSlot(slot.doctorTimeSlotId)
      .subscribe({
        next: () => {
          this.loadTimeSlots();
          alert('تم حذف الموعد بنجاح');
        },
        error: (error) => {
          console.error('خطأ في حذف الموعد:', error);
          this.handleError(error);
        }
      });
  }

  toggleAvailability(slot: DoctorTimeSlotDTO): void {
    const operation = slot.isAvailable 
      ? this.timeSlotService.deactivateTimeSlot(slot.doctorTimeSlotId)
      : this.timeSlotService.activateTimeSlot(slot.doctorTimeSlotId);

    operation.subscribe({
      next: () => {
        this.loadTimeSlots();
        const message = slot.isAvailable ? 'تم إلغاء تفعيل الموعد' : 'تم تفعيل الموعد';
        alert(message);
      },
      error: (error) => {
        console.error('خطأ في تغيير حالة التوفر:', error);
        this.handleError(error);
      }
    });
  }

  private handleError(error: any): void {
    if (error.status === 401 || error.status === 403) {
      alert('انتهت صلاحية الجلسة. سيتم إعادة توجيهك لتسجيل الدخول.');
      this.authService.logout();
    } else if (error.status === 400) {
      alert('بيانات غير صحيحة. يرجى التحقق من المدخلات.');
    } else if (error.status === 500) {
      alert('خطأ في الخادم. يرجى المحاولة مرة أخرى.');
    } else {
      alert('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
    }
  }

  private validateForm(): boolean {
    // Check if date is selected
    if (!this.formData.selectedDate) {
      alert('يرجى اختيار التاريخ');
      return false;
    }

    // Check if date is not in the past
    const selectedDate = new Date(this.formData.selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      alert('لا يمكن إنشاء موعد في تاريخ سابق');
      return false;
    }

    const startTime = this.timeToMinutes(this.formData.startTime);
    const endTime = this.timeToMinutes(this.formData.endTime);
    
    if (endTime <= startTime) {
      alert('وقت الانتهاء يجب أن يكون بعد وقت البداية');
      return false;
    }
    
    if (endTime - startTime < 15) {
      alert('يجب أن يكون الموعد 15 دقيقة على الأقل');
      return false;
    }

    // Check if appointment is too long (e.g., more than 4 hours)
    if (endTime - startTime > 240) {
      alert('لا يمكن أن يكون الموعد أكثر من 4 ساعات');
      return false;
    }
    
    return true;
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private formatTimeForInput(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private getDayOfWeekEnum(dayIndex: number): WeekDays {
    return dayIndex as WeekDays;
  }

  formatTime(date: Date): string {
    // Parse the date string and create a new Date object
    const localDate = new Date(date);
    
    console.log('Formatting time:', {
      input: date,
      parsed: localDate.toString(),
      utc: localDate.toUTCString()
    });
    
    // Format using local time
    return localDate.toLocaleTimeString('ar-EG', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  }

  formatDate(date: Date): string {
    // Parse the date string and create a new Date object
    const localDate = new Date(date);
    
    return localDate.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getArabicDay(englishDay: string): string {
    return this.arabicDays[englishDay] || englishDay;
  }
}