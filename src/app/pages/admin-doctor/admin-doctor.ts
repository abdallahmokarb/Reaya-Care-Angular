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
  selectedStatus: number = 1; // Default to active
  filteredDoctors: Idoctorcard[] = [];

   documentLinks = [
    { key: 'medicalLicenseUrl', label: 'رخصة مزاولة المهنة' },
    { key: 'nationalIdUrl', label: 'الرقم القومي' },
    { key: 'graduationCertificateUrl', label: 'شهادة التخرج' },
    { key: 'experienceCertificateUrl', label: 'شهادة الخبرة' }
  ];
  constructor(private doctorService: DoctorService ,private doctorInfoService: DoctorInfoService) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.filterDoctors(this.selectedStatus);
  }

  loadDoctors() {
     this.doctorService.getAlldDoctorsByStatus().subscribe({
      next: (data: Idoctorcard[]) => {
        this.doctors = data;
        this.filterDoctors(this.selectedStatus);
        if (this.filteredDoctors.length > 0) {
          this.loadDoctorDetails(this.filteredDoctors[0].doctorId);
        }
      },
      error: (error) => console.error('Error loading doctors:', error)
    });
  }


  filterDoctors(status: number) {
  this.selectedStatus = status;
  this.filteredDoctors = this.doctors.filter(doc => doc.status === status);
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
      this.loadDoctors(); // Refresh the list after approval
    });
  }

  rejectDoctor(id: number) {
    this.doctorService.rejectDoctor(id).subscribe(() => {
      this.loadDoctorDetails(id);
      this.loadDoctors(); // Refresh the list after rejection
    });
  }
  pendingDoctor(id: number) {
    this.doctorService.pendingDoctor(id).subscribe(() => {
      this.loadDoctorDetails(id);
      this.loadDoctors(); // Refresh the list after setting to pending
    });
  }
  suspendDoctor(id: number) {
    this.doctorService.suspendDoctor(id).subscribe(() => {
      this.loadDoctorDetails(id);
      this.loadDoctors(); // Refresh the list after suspension
    });
  }
  deactivateDoctor(id: number) {
    this.doctorService.deactivateDoctor(id).subscribe(() => {
      this.loadDoctorDetails(id);
      this.loadDoctors(); // Refresh the list after deactivation
    });
  }

   getStatusLabel(status: number): string {
    switch (status) {
      case 0: return 'معلق';
      case 1: return 'مقبول';
      case 2: return 'مرفوض';
      case 3: return 'معلق مؤقتًا';
      case 4: return 'غير مفعل';
      default: return 'غير معروف';
    }}
}
