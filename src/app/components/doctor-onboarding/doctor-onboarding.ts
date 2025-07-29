import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorInfoService } from '../../shared/services/doctor-info-service';
import { Idoctor } from '../../models/idoctor';
import { ISpecialization } from '../../models/ispecialization';
import { IDocument, IDocumentResponse } from '../../models/idocument';
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
  private doctorId = '1'; // Replace with actual doctor ID
  private docInfo!: IDocument;
  editMode = false;
  editForm: FormGroup;
  public selectedFiles: { [key: string]: File } = {};
  public docInfoResponseUrl={
    medicalLicense: '',
    nationalId: '',
    graduationCertificate: '',
    experienceCertificate: '',
    ProfileImage: ''
  }; // Initialize to avoid undefined errors

  private docInfoResponse!: IDocumentResponse[]
  constructor(private router: Router, private fb: FormBuilder, private doctorInfoService: DoctorInfoService) {
    // Initialize any data or state here
    this.getSpecializations();
    this.getDoctorInfo();
    this.getAllDocuments();


    this.editForm = this.fb.group({
      fullName: [this.doctor?.fullName || ''],
      email: [this.doctor?.email || ''],
      phoneNumber: [this.doctor?.phoneNumber || ''],
      specializationId: [this.doctor?.specializationId || null],
      expYears: [this.doctor?.expYears || ''],
      aboutMe: [this.doctor?.aboutMe || ''],
      fees: [this.doctor?.fees || ''],
      service: [this.doctor?.serviceId || null],
      location: [this.doctor?.location || ''],
      detailedAddress: [this.doctor?.detailedAddress || ''],
      gender: [this.doctor?.gender || ''],
    });
    //this.docInfoResponse = JSON.parse(localStorage.getItem('docmentrespose') || 'null');
    this.docInfoResponseUrl = {
      medicalLicense: this.doctor?.medicalLicenseUrl || '',
      nationalId: this.doctor?.nationalIdUrl || '',
      graduationCertificate: this.doctor?.graduationCertificateUrl || '',
      experienceCertificate: this.doctor?.experienceCertificateUrl || '',
      ProfileImage: this.doctor?.profilePictureUrl || ''
    }
    console.log('Document response URL:', this.docInfoResponseUrl);
  }



  getDoctorInfo() {
    this.doctorInfoService.getDoctorInfo(this.doctorId).subscribe({
      next: (doctor: Idoctor) => {
        console.log(doctor);
        this.doctor = doctor;  // Assign the fetched doctor data to the component property
        // Handle the doctor data as needed
         this.docInfoResponseUrl = {
      medicalLicense: this.doctor?.medicalLicenseUrl || '',
      nationalId: this.doctor?.nationalIdUrl || '',
      graduationCertificate: this.doctor?.graduationCertificateUrl || '',
      experienceCertificate: this.doctor?.experienceCertificateUrl || '',
      ProfileImage: this.doctor?.profilePictureUrl || ''
    }
    console.log('Document response URL:', this.docInfoResponseUrl);
      },
      error: (error) => {
        console.error('Error fetching doctor info:', error);
      }
    });
  }

  openEditModal() {
    console.log('Opening edit modal');
    this.editForm.patchValue(this.doctor); // doctor is your current doctor object
    this.editForm.patchValue({
      specializationId: this.doctor.specializationId || 0 
    });
    this.editForm.patchValue({
      service: this.doctor.serviceId || 0
    });

    this.editMode = true;

    // Reset detailedAddress and location if service is online
    this.editForm.get('service')?.valueChanges.subscribe((val) => {
      if (val == 2) {
        this.editForm.patchValue({
          detailedAddress: '',
          location: ''
        });
      }
    });

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
  onFileSelect(event: Event, type: string) {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    this.selectedFiles[type] = input.files[0];
    console.log(`Selected ${type}:`, input.files[0].name);
    console.log('Selected files:', this.selectedFiles);
  }
}
  uploadFile( type: string) {
    const file = this.selectedFiles[type];
    if (file) {
      const formData = new FormData();
      formData.append("File", file);
      formData.append("DocumentType", type);
      formData.append("DoctorId", this.doctorId);
      console.log(formData);
    
      this.doctorInfoService.uploadFile(formData).subscribe({
        next: (response:any) => {
          console.log(`${type} uploaded successfully:`, response);
          this.docInfoResponse = response; // Store the response for later use
          //localStorage.setItem('docmentrespose', JSON.stringify(response));
          
          if (type === 'medicalLicense') {
            this.docInfoResponseUrl.medicalLicense = response.data.filePath; // Store the response
          } else if (type === 'nationalId') {
            this.docInfoResponseUrl.nationalId = response.data.filePath; // Store the response
          } else if (type === 'graduationCertificate') {
            this.docInfoResponseUrl.graduationCertificate = response.data.filePath; // Store the response
          }else if (type === 'experienceCertificate') {
            this.docInfoResponseUrl.experienceCertificate = response.data.filePath; // Store the response
          }else if (type === 'ProfileImage') {
            this.docInfoResponseUrl.ProfileImage = response.data.filePath; // Update the doctor's profile picture
          }
        },
        error: (error) => {
          console.error(`Error uploading ${type}:`, error);
        }
      });
    } else {
      console.warn(`No file selected for ${type}`);
    }
    // Clear the selected file after upload
  }
  editFile(type: string) {
    const file = this.selectedFiles[type];
    if (file) {
      const formData = new FormData();
      formData.append("File", file);
      formData.append("DocumentType", type);
      formData.append("DocumentId", this.docInfoResponse.find(doc => doc.documentType === type)?.data.documentId.toString() || '0'); // Ensure DocumentId is included
      formData.append("FilePath", this.docInfoResponse.find(doc => doc.documentType === type)?.data.filePath || '');

      this.doctorInfoService.editfile(formData).subscribe({
        next: (response: any) => {
          //localStorage.setItem('docmentrespose', JSON.stringify(response));
          console.log(`${type} edited successfully:`, response.data.filePath);
          this.getAllDocuments(); // Refresh doctor info after editing
          if (type === 'MedicalLicense') {
            this.docInfoResponseUrl.medicalLicense = response.data.filePath; // Update the URL
          } else if (type === 'NationalId') {
            this.docInfoResponseUrl.nationalId = response.data.filePath; // Update the URL
          } else if (type === 'GraduationCertificate') {
            this.docInfoResponseUrl.graduationCertificate = response.data.filePath; // Update the URL
          }
          else if (type === 'ExperienceCertificate') {
            this.docInfoResponseUrl.experienceCertificate = response.data.filePath; // Update the URL
          }else if (type === 'ProfileImage') {
            this.docInfoResponseUrl.ProfileImage = response.data.filePath; // Update the doctor's profile picture
          }
          console.log('Document response:', this.docInfoResponseUrl);
        },
        error: (error) => {
          console.error(`Error editing ${type}:`, error);
        }
      });
    } else {
      console.warn(`No file selected for ${type}`);
    }
    this.selectedFiles = {};
  }

  uploadProfileImage(event: Event) {
    this.onFileSelect(event, 'ProfileImage');
    this.uploadFile('ProfileImage');
  }
  editProfileImage(event: Event) {
    this.onFileSelect(event, 'ProfileImage');
    this.editFile('ProfileImage');
  }
  getAllDocuments() {
    this.doctorInfoService.getallDocuments(this.doctorId).subscribe({
      next: (documents: IDocumentResponse[]) => {
        this.docInfoResponse = documents;
        console.log('Documents fetched successfully:', this.docInfoResponse);
        console.log('Document URLs:',  this.docInfoResponse.find(doc => doc.documentType === 'ProfileImage')?.data.documentId.toString());

      },
      error: (error) => {
        console.error('Error fetching documents:', error);
      }
    });
  }
}

