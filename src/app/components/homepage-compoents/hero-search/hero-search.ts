import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ISpecialization } from '../../../models/ispecialization';
import { Igovernment } from '../../../models/igovernment';
import { AddressService } from '../../../shared/services/address-service';
import { DoctorService } from '../../../shared/services/doctor-service';
import { Specialization } from '../../../shared/services/specialization';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AidoctorService } from '../../../shared/services/Ai/aidoctor-service';
import { HttpParams } from '@angular/common/http';
import * as RecordRTC from 'recordrtc';
import { DoctorResult } from '../../../models/iairesponse';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NgxSliderModule],
  templateUrl: './hero-search.html',
  styleUrls: ['./hero-search.css'],
})
export class HeroSearch {
  activeTab: 'find' | 'voice' | 'homeVisit' | 'hospital' = 'find';
  private doctorService = inject(DoctorService);
  private addressService = inject(AddressService);
  private specializationService = inject(Specialization);

  isLoading = true;
  specializations: ISpecialization[] = [];
  governments: Igovernment[] = [];

  selectedSpecialization: number = 0;
  selectedGovernment: number = 0;
  serviceTypesFilters: string[] = [];

  doctors: any[] = [];
  filteredDoctors: any[] = [];

  searchTermBtn: string = '';
  selectedDoctorId: string = '';

  recorder: RecordRTC.StereoAudioRecorder | null = null;
  stream!: MediaStream;
  isRecording = false;
  isUploading = false;
  audioUrl: string | null = null;
  transcription: number = 0;
  parms = new HttpParams();

  constructor(
    private aidoctorService: AidoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.specializationService.getAllSpecializations().subscribe({
      next: (data) => (this.specializations = data),
      error: (err) => console.error('Error fetching specializations:', err),
    });

    this.addressService.getAllGovernments().subscribe({
      next: (data) => (this.governments = data),
      error: (err) => console.error('Error fetching governments:', err),
    });

    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.filteredDoctors = [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
        this.isLoading = false;
      },
    });
  }

  setActiveTab(tab: 'find' | 'voice' | 'homeVisit' | 'hospital') {
    this.activeTab = tab;
  }

  applyFilters() {
    const term = this.searchTermBtn.trim().toLowerCase();

    if (term === '') {
      this.filteredDoctors = [];
      return;
    }

    this.filteredDoctors = this.doctors.filter((doctor) =>
      doctor.fullName.toLowerCase().includes(term)
    );
  }

  searchDoctors() {
    this.router.navigate(['/all-doctors'], {
      queryParams: {
        specializationId: this.selectedSpecialization,
        governmentId: this.selectedGovernment,
      },
    });
  }

  applyFiltersBtn() {
    this.filteredDoctors = this.doctors.filter((doctor) =>
      doctor.fullName.toLowerCase().includes(this.searchTermBtn.toLowerCase())
    );
  }
  navigateToDoctor(doctorId: string) {
    if (doctorId) {
      this.router.navigate(['/doctor-details', doctorId]);
    }
  }

  async startRecording() {
    this.audioUrl = null;
    this.transcription = 0;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
        type: 'audio',
        mimeType: 'audio/wav', // or fallback to 'audio/webm' if needed
      });

      this.recorder.record();
      this.isRecording = true;
    } catch (err) {
      console.error('🎤 Microphone access denied:', err);
    }
  }

  stopRecording() {
    if (!this.recorder || !this.isRecording) return;

    this.recorder.stop((blob: Blob) => {
      this.audioUrl = URL.createObjectURL(blob);
      this.isRecording = false;

      // Stop microphone stream
      this.stream.getTracks().forEach((track) => track.stop());

      this.uploadAudio(blob);
    });
  }

  uploadAudio(blob: Blob) {
    const formData = new FormData();
    formData.append('file', blob, 'recording.wav');
    console.log('Uploading WAV audio...');

    this.isUploading = true;

    this.aidoctorService.getDoctorDatasuggest(formData).subscribe({
      next: (response: DoctorResult[]) => {
        console.log(' Upload successful:', response);
        const doctorIds = response.map((id) => id.doctorId);
        console.log('Doctor IDs:', doctorIds);
        this.router.navigate(['/all-doctors'], {
          queryParams: { doctorId: doctorIds },
        });

        this.isUploading = false;
      },
      error: (error) => {
        console.error(' Upload error:', error);
        this.isUploading = false;
      },
    });
  }
}
