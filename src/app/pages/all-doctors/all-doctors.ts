import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DoctorService } from '../../shared/services/doctor-service';
import { Specialization } from '../../shared/services/specialization';
import { ISpecialization } from '../../models/ispecialization';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../shared/services/address-service';
import { Igovernment } from '../../models/igovernment';
import { Idoctorcard } from '../../models/idoctorcard';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-all-doctors',
  imports: [RouterModule, FormsModule, CommonModule, NgxSliderModule],
  templateUrl: './all-doctors.html',
  styleUrl: './all-doctors.css'
})
export class AllDoctors implements OnInit {

   private doctorService = inject(DoctorService);
  private addressService = inject(AddressService);
  private specializationService = inject(Specialization);
  private route = inject(ActivatedRoute);

  doctors: Idoctorcard[] = [];
  filteredDoctors: Idoctorcard[] = [];
  isLoading = true;

  orderBy: string = 'rating';

  specializations: ISpecialization[] = [];
  governments: Igovernment[] = [];

  selectedSpecialization: number = 0;
  selectedGovernment: number = 0;
  genderFilters: string[] = [];
  availableTimesFilters: string[] = [];
  serviceTypesFilters: string[] = [];

  minPrice: number = 0;
  maxPrice: number = 500;

  priceSliderValue: number = 0;
  priceSliderHighValue: number = 500;

  sliderOptions: Options = {
    floor: 0,
    ceil: 500,
    step: 10,
    translate: (value: number): string => {
      return `${value} ج.م`;
    }
  };

ngOnInit(): void {

    // Read specializationId from query string ONCE
    const specializationId = Number(this.route.snapshot.queryParamMap.get('specializationId'));
    if (!isNaN(specializationId)) {
      this.selectedSpecialization = specializationId;
    }
    // Load doctors and apply filters
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.applyFilters(); // apply after loading
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
        this.isLoading = false;
      }
    });

    this.specializationService.getAllSpecializations().subscribe({
      next: (data) => {
        this.specializations = data;
      },
      error: (err) => {
        console.error('Error fetching specializations:', err);
      }
    });

    this.addressService.getAllGovernments().subscribe({
      next: (data) => {
        this.governments = data;
      },
      error: (err) => {
        console.error('Error fetching governments:', err);
      }
    });
  }

  toggleFilters(): void {
    const sidebar = document.getElementById('filterSidebar');
    if (sidebar) {
      sidebar.classList.toggle('translate-x-full');
    }
  }

  // Sorting logic
  sortDoctors() {
    if (!this.doctors) return;

    switch (this.orderBy) {
      case 'rating':
        this.filteredDoctors.sort((a, b) => b.ratingValue - a.ratingValue); // descending
        break;
      case 'fees':
        this.filteredDoctors.sort((a, b) => a.fees - b.fees); // ascending
        break;
      case 'timeslot':
        this.filteredDoctors.sort((a, b) => a.watingTime - b.watingTime); // ascending
        break;
    }
  }

  toggleFilter(filterArray: string[], event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      filterArray.push(value);
    } else {
      const index = filterArray.indexOf(value);
      if (index > -1) filterArray.splice(index, 1);
    }

    this.applyFilters();
  }

  applyFilters() {
    console.log('Applying filters with:', {
      specialization: this.selectedSpecialization,
      government: this.selectedGovernment,
      genderFilters: this.genderFilters,
      serviceTypesFilters: this.serviceTypesFilters
    });

    this.filteredDoctors = this.doctors.filter((doc) => {
      const matchesSpecialization =
        this.selectedSpecialization === 0 || doc.specializationId === this.selectedSpecialization;
      const matchesGovernment = this.selectedGovernment === 0 || doc.governemntId === this.selectedGovernment;
      const matchesGender = this.genderFilters.length === 0 || this.genderFilters.includes(doc.gender);
      const matchesPrice = doc.fees >= this.minPrice && doc.fees <= this.maxPrice;
      const matchesServiceType = this.serviceTypesFilters.length === 0 || this.serviceTypesFilters.includes(doc.doctorService);

      const matchesAvailableTimes =
        this.availableTimesFilters.length === 0 ||
        this.availableTimesFilters.some((filter) => {
          if (filter === 'اليوم') return doc.hasAvailableTimeSlotsToday;
          if (filter === 'غداً') return doc.hasAvailableTimeSlotsTomorrow;
          if (filter === 'أي يوم') return doc.hasAvailableTimeSlots;
          return false;
        });

      // const matchesPrice = doc.fees >= this.minPrice && doc.fees <= this.maxPrice;

      return matchesSpecialization &&
            matchesGovernment &&
            matchesGender &&
            matchesServiceType &&
            matchesAvailableTimes &&
            matchesPrice;
    });

    this.sortDoctors();
  }

  onSliderChange(): void {
    this.minPrice = this.priceSliderValue;
    this.maxPrice = this.priceSliderHighValue;
    this.applyFilters();
  }

}
