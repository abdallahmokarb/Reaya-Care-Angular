import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Patientservice } from '../../shared/services/patient-service/patientservice';
import { Ipatient } from '../../models/ipatient';

@Component({
  selector: 'app-manage-patients',
  imports: [CommonModule],
  templateUrl: './manage-patients.html',
  styleUrl: './manage-patients.css'
})
export class ManagePatients implements OnInit{

  isLoading : boolean = true;
  patients : Ipatient[] = [];
  patientService = inject(Patientservice);
  // patients = [
  //   {
  //     fullName: 'أحمد محمد',
  //     phoneNumber: '01001234567',
  //     email: 'ahmed@example.com',
  //     isLocked: false
  //   },
  //   {
  //     fullName: 'سارة علي',
  //     phoneNumber: '01123456789',
  //     email: 'sara@example.com',
  //     isLocked: true
  //   }
  // ];

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
        this.isLoading = false;
      },
    })
  }
  toggleLock(patient: Ipatient) {
    this.patientService.toggleLock(patient.patientId).subscribe({
      next: (res) => {
        if(res) 
          patient.isLocked = !patient.isLocked;
      },
      error: (err) => {
        console.error('Error Toggle Lock:', err);
      },
    })
    
    // Optionally: Call API to update status
  }
}
