import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorInfoService } from '../../shared/services/doctor-info-service';
import { Idoctor } from '../../models/idoctor';
@Component({
  selector: 'app-doctor-onboarding',
  imports: [CommonModule,
    FormsModule,],
  templateUrl: './doctor-onboarding.html',
  styleUrl: './doctor-onboarding.css'
})
export class DoctorOnboarding {
  //  doctor = {
  //   fullName: 'Dr. Sara Ali',
  //   email: 'sara.ali@doc.com',
  //   phoneNumber: '01987654321',
  //   balance: 1500,
  //   expYears: 10,
  //   aboutMe: 'Experienced cardiologist with 10 years in heart care.',
  //   ratingValue: 4.8,
  //   fees: 500,
  //   status: 1,
  //   specialization: 'Cardiologist'
  // };
  doctor!: Idoctor  
  constructor(private router: Router, private doctorInfoService: DoctorInfoService) {
    // Initialize any data or state here
    this.getDoctorInfo();
  }
  
  goToEdit() {
    this.router.navigate(['/edit-doctor']);
  }

  getDoctorInfo() {
    const doctorId = '1'; // Replace with actual doctor ID
    this.doctorInfoService.getDoctorInfo(doctorId).subscribe({
      next: (doctor: Idoctor) => {
        console.log(doctor);
        this.doctor = doctor;  // Assign the fetched doctor data to the component property
        // Handle the doctor data as needed
      },
      error: (error) => {
        console.error('Error fetching doctor info:', error);
      }
    });
  }
}
