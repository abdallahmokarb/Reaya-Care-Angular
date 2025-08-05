import { Component, OnInit } from '@angular/core';
import { Idoctordetails } from '../../models/idoctordetails';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../shared/services/doctor-service';
import { Idoctorcard } from '../../models/idoctorcard';
import { DoctorInfoService } from '../../shared/services/doctor-info-service';
import { Idoctor } from '../../models/idoctor';

@Component({
  selector: 'app-admin-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-doctor.html',
  styleUrl: './admin-doctor.css'
})
export class AdminDoctorComponent implements OnInit {
  doctors: Idoctorcard[] = [];
  selectedDoctor: Idoctor | null = null;

  constructor(private doctorService: DoctorService ,private doctorInfoService: DoctorInfoService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data: Idoctorcard[]) => {
        this.doctors = data;
        if (this.doctors.length > 0) {
          this.loadDoctorDetails(this.doctors[0].doctorId);
        }
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
      }
    });
  }

  loadDoctorDetails(id: number) {
    this.doctorInfoService.getDoctorInfo(id.toString()).subscribe({
      next: (data: Idoctor) => {
        this.selectedDoctor = data;
      },
      error: (error) => {
        console.error('Error loading doctor details:', error);
        this.selectedDoctor = null; // Reset if there's an error
      }
    });
   
  }

  selectDoctor(doctor: Idoctorcard) {
    this.loadDoctorDetails(doctor.doctorId);
  }

  approveDoctor(id: number) {
    this.doctorService.approveDoctor(id).subscribe(() => {
      this.loadDoctorDetails(id);
    });
  }

  rejectDoctor(id: number) {
    this.doctorService.rejectDoctor(id).subscribe(() => {
      this.loadDoctorDetails(id);
    });
  }
}
