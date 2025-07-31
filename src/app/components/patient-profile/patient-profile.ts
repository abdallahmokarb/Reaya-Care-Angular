import { Component } from '@angular/core';
import { Patientservice } from '../../shared/services/patient-service/patientservice';
import { Ipatient } from '../../models/ipatient';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.html',
  styleUrls: ['./patient-profile.css'],
  imports: [CommonModule, FormsModule],
})
export class PatientProfile {
  patientId: string = '10'; // Replace with dynamic ID as needed
  editMode: boolean = false;

  patient: Ipatient | null = null;
  editedPatient: Ipatient = {
    userId: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    createdAt: '',
  };

  constructor(private patientService: Patientservice) {
    this.getPatientProfile();
  }

  getPatientProfile() {
    this.patientService.getPatientUrl(this.patientId).subscribe({
      next: (data: Ipatient) => {
        this.patient = data;
        this.editedPatient = { ...data };
        console.log('Patient data fetched:', this.patient);
      },
      error: (err) => {
        console.error('Error fetching patient data:', err);
      },
    });
  }

  onEditClick() {
    if (this.patient) {
      this.editedPatient = { ...this.patient };

      this.editMode = true;
    }
  }

  save(form: NgForm) {
    if (form.valid) {
      this.patient = { ...this.editedPatient };
      this.editMode = false;

      // Optionally update to server:
      this.patientService.updatePatient(this.patient).subscribe({
        next: (data) => {
          console.log('Patient updated successfully:', data);
        },
        error: (err) => {
          console.error('Error updating patient:', err);
        },
      });

      //console.log('Updated patient:', this.patient);
    } else {
      console.warn('Form is invalid');
    }
  }

  cancel() {
    this.editMode = false;
  }
}
