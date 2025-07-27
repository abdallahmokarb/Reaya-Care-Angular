import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorInfoService } from '../../shared/services/doctor-info-service';
import { Idoctor } from '../../models/idoctor';
import { ISpecialization } from '../../models/ispecialization';
@Component({
  selector: 'app-doctor-onboarding',
  imports: [CommonModule,
    FormsModule,ReactiveFormsModule] ,
  templateUrl: './doctor-onboarding.html',
  styleUrl: './doctor-onboarding.css'
})
export class DoctorOnboarding {

  public doctor!: Idoctor;
  public specializations!: ISpecialization[]
  private doctorId = '24'; // Replace with actual doctor ID
  editMode = false;
  editForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private doctorInfoService: DoctorInfoService) {
    // Initialize any data or state here
    this.getSpecializations();
    this.getDoctorInfo();

    this.editForm = this.fb.group({
      fullName: [this.doctor?.fullName || ''],
      email: [this.doctor?.email || ''],
      phoneNumber: [this.doctor?.phoneNumber || ''],
      specializationId: [this.doctor?.specializationId || null],
      expYears: [this.doctor?.expYears || ''],
      aboutMe: [this.doctor?.aboutMe || ''],
      fee: [this.doctor?.fees || ''],
      service: [this.doctor?.serviceId || null]
      
    });
    
  }
  
  

  getDoctorInfo() {
    this.doctorInfoService.getDoctorInfo(this.doctorId).subscribe({
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

  openEditModal() {
  
    this.editForm.patchValue(this.doctor); // doctor is your current doctor object
    this.editForm.patchValue({
      specializationId: this.doctor.specializationId || 0 
    });
    this.editForm.patchValue({
      service: this.doctor.serviceId || 0
    });

    this.editMode = true;
  }

  closeEditModal() {
    this.editMode = false;
  }

  submitEdit() {
    const updatedDoctor = this.editForm.value;
    this.doctorInfoService.updateDoctorInfo(this.doctorId, updatedDoctor).subscribe({
      next: (res) => {
        console.log('Doctor info updated successfully:', res);
        this.doctor = res;
        this.editMode = false;
      },
      error: (err) => {
        console.error('Error updating doctor info:', err);
        this.editMode = false;
        
      }
    });
  }
  getSpecializations() {
    this.doctorInfoService.getspecializations().subscribe({
      next: (specializations: ISpecialization[]) => {
        this.specializations = specializations;
      },
      error: (error) => {
        console.error('Error fetching specializations:', error);
      }
    });
  }
}
