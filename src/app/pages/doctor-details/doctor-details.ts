import { Component, inject, OnInit, Pipe } from '@angular/core';
import { Idoctordetails } from '../../models/idoctordetails';
import { DoctorService } from '../../shared/services/doctor-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TimeslotService } from '../../shared/services/timeslot-service';
import { Itimeslot } from '../../models/itimeslot';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingService } from '../../shared/services/rating-service';
import { Irating } from '../../models/irating';
import {
  BookingDetails,
  YourBooking,
} from '../../shared/interfaces/bookingdetails';
import { PaymentService } from '../../shared/services/payment';
import { RatingForm } from "../../components/rating-form/rating-form";

@Component({
  selector: 'app-doctor-details',
  imports: [FormsModule, CommonModule, RouterModule, RatingForm, RatingForm],
  templateUrl: './doctor-details.html',
  styleUrl: './doctor-details.css',
})
export class DoctorDetails implements OnInit {
  today: string;
  doctorId!: number;
  doctor?: Idoctordetails;
  availableTimeSlots: Itimeslot[] = [];
  ratings: Irating[] = [];
  isLoading = true;
  user: any = null;
  selectedSlot: Itimeslot | null = null;
  isSubmitting = false;

  minDate!: string;
  selectedDate!: string;
  selectSlot(slot: Itimeslot): void {
    this.selectedSlot = slot;
  }

  // selectedDate: string = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  constructor(private paymentService: PaymentService) {
    // Initialize today's date in YYYY-MM-DD format for the date input
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }

  route = inject(ActivatedRoute);
  doctorService = inject(DoctorService);
  timeslotService = inject(TimeslotService);
  ratingService = inject(RatingService);

  ngOnInit(): void {
    this.user = JSON.parse(
      localStorage.getItem('user') || sessionStorage.getItem('user') || 'null'
    );

    const today = new Date().toLocaleDateString('en-CA'); // "2025-07-29"
    this.minDate = today;
    this.selectedDate = today;

    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (data) => {
        console.log(data);
        this.doctor = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching doctor details:', err);
        this.isLoading = false;
      },
    });

    this.ratingService.getAllDoctorRatings(this.doctorId).subscribe({
      next: (ratings) => {
        this.ratings = ratings;
      },
      error: (err) => {
        console.error('Error fetching doctor ratings:', err);
      },
    });

    this.getTimeSlots();
  }

  onDateChange() {
    this.getTimeSlots();
  }

  // getTimeSlots() {
  //   const date = new Date(this.selectedDate);
  //   this.getAvailableTimeSlotsForDoctor(this.doctorId, date).subscribe({
  //     next: (slots) => (this.availableTimeSlots = slots),
  //     error: (err) => console.error(err),
  //   });
  // }
  getTimeSlots() {
    const date = new Date(this.selectedDate);
    console.log('Selected date:', date); // Log the date being used
    this.getAvailableTimeSlotsForDoctor(this.doctorId, date).subscribe({
      next: (slots) => {
        console.log('Available time slots:', slots); // Log the received slots
        this.availableTimeSlots = slots;
      },
      error: (err) => {
        console.error('Error fetching time slots:', err); // More detailed error logging
      },
    });
  }

  getAvailableTimeSlotsForDoctor(
    doctorId: number,
    date: Date
  ): Observable<Itimeslot[]> {
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

  getStars(value: number | undefined): string[] {
    return this.ratingService.getRatingAsStars(value);
  }

  onRatingAdded(_: Irating) {
    this.ratingService.getAllDoctorRatings(this.doctorId).subscribe({
      next: (ratings) => {
        this.ratings = ratings;
      },
      error: (err) => {
        console.error('Error fetching doctor ratings:', err);
      },
    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }


  async pay(): Promise<void> {
    if (!this.user) return;
    this.isSubmitting = true;

    const amount = Number(this.doctor?.fees ?? 0) * 100;

    const bookingDetails: BookingDetails = {
      amount,
      firstName: this.user.userName,
      lastName: this.user.userName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      street: 'Nile St',
      building: '001',
      floor: '001',
      apartment: '001',
      city: 'Minya',
      state: 'Minya',
      postalCode: '001',
      country: 'EG',
      items: [
        {
          name: 'appointment booking fees',
          serviceId: '1001',
          serviceCatogry: 'service catogry',
          description: 'care app',
          amount,
          quantity: 1,
        },
      ],
    };

    const yourBooking: YourBooking = {
      doctorId: this.doctor?.doctorId ?? 0,
      doctorName: this.doctor?.fullName ?? '',
      slot: this.selectedSlot ?? undefined,
      userId: this.user.id,
    };

    localStorage.setItem('yourBooking', JSON.stringify(yourBooking));

    try {
      const data = await this.paymentService
        .createPayment(bookingDetails)
        .toPromise();
      this.isSubmitting = false;

      const paymentUrl = data.iframeUrl || data.payment_url;
      if (paymentUrl) {
        this.redirectToPayment(paymentUrl);
      } else {
        alert('فشل في استلام رابط الدفع');
      }
    } catch (error) {
      this.isSubmitting = false;
      console.error('err', error);
      alert('فشل في انشاء سيشن الدفع .. حاول مرة اخرى لاحقا');
    }
  }

  redirectToPayment(url: string): void {
    const countdownDiv = document.createElement('div');
    countdownDiv.innerText = `جاري تحويلك إلى بوابة الدفع خلال 5 ثواني...`;
    countdownDiv.className = `
    fixed inset-0 z-50 flex items-center justify-center
    bg-white/30 dark:bg-black/30 backdrop-blur-md
    text-black dark:text-white
    px-6 py-10 rounded-none
    text-2xl font-bold text-center
  `;

    document.body.appendChild(countdownDiv);

    let secondsLeft = 5;
    const interval = setInterval(() => {
      secondsLeft--;
      countdownDiv.innerText = `جاري تحويلك إلى بوابة الدفع خلال ${secondsLeft} ثواني...`;
      if (secondsLeft === 0) {
        clearInterval(interval);
        document.body.removeChild(countdownDiv);
        window.location.href = url;
      }
    }, 1000);
  }
}
