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

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NgxSliderModule],
  templateUrl: './hero-search.html',
  styleUrls: ['./hero-search.css'],
})
export class HeroSearch {
  activeTab: 'find' | 'voice' | 'homeVisit' = 'find';
  private doctorService = inject(DoctorService);
  private addressService = inject(AddressService);
  private specializationService = inject(Specialization);
  private router = inject(Router);

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

  setActiveTab(tab: 'find' | 'voice' | 'homeVisit') {
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
}
