import { Component, inject, OnInit, Pipe } from '@angular/core';
import { Idoctordetails } from '../../models/idoctordetails';
import { DoctorService } from '../../shared/services/doctor-service';
import { ActivatedRoute } from '@angular/router';
import { TimeslotService } from '../../shared/services/timeslot-service';
import { Itimeslot } from '../../models/itimeslot';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './doctor-details.html',
  styleUrl: './doctor-details.css'
})
export class DoctorDetails implements OnInit {
  today: string;
  doctorId!: number;
  doctor?: Idoctordetails;
  availableTimeSlots: Itimeslot[] = [];
  isLoading = true;

  selectedDate: string = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  constructor() {
    // Initialize today's date in YYYY-MM-DD format for the date input
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }

  route = inject(ActivatedRoute);
  doctorService = inject(DoctorService);
  timeslotService = inject(TimeslotService);

  ngOnInit(): void {


    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (data) => {
        this.doctor = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching doctor details:', err);
        this.isLoading = false;
      }
    });

     this.getTimeSlots();

  }


  onDateChange() {
    this.getTimeSlots();
  }

  getTimeSlots() {
    const date = new Date(this.selectedDate);
    this.getAvailableTimeSlotsForDoctor(this.doctorId, date).subscribe({
      next: (slots) => (this.availableTimeSlots = slots),
      error: (err) => console.error(err),
    });
  }


  getAvailableTimeSlotsForDoctor(doctorId: number, date: Date): Observable<Itimeslot[]> {
    return this.timeslotService.getAvailableTimeSlotsForDoctor(doctorId, date);
  }

  formatArabicTime(date: Date | string): string {
  const time = new Date(date); // ensure it's a Date object
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const arabicPeriod = hours < 12 ? 'صباحًا' : 'مساءً';
  const hour12 = hours % 12 || 12;

  return `${hour12}:${minutes.toString().padStart(2, '0')} ${arabicPeriod}`;
}

}
