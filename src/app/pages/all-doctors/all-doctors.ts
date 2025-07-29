import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorService } from '../../shared/services/doctor-service';
import { Specialization } from '../../shared/services/specialization';
import { ISpecialization } from '../../models/ispecialization';
import { SpecializationDTO } from '../../models/SpecializationDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../shared/services/address-service';
import { Igovernment } from '../../models/igovernment';
import { Idoctorcard } from '../../models/idoctorcard';

@Component({
  selector: 'app-all-doctors',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './all-doctors.html',
  styleUrl: './all-doctors.css'
})
export class AllDoctors implements OnInit {

  private doctorService = inject(DoctorService);
  private addressService = inject(AddressService);
  private specializationService = inject(Specialization); // specialization service injection


  doctors: Idoctorcard[] = [];
  filteredDoctors: Idoctorcard[] = [];
  isLoading = true;

  orderBy: string = 'rating';

  specializations: SpecializationDTO[] = [];
  governments: Igovernment[] = [];
 
  selectedSpecialization: number = 0;
  selectedGovernment: number = 0;
  genderFilters: string[] = [];
  availableTimesFilters: string[] = [];
  serviceTypesFilters: string[] = [];
  minPrice: number = 0;
  maxPrice: number = 500;



ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.filteredDoctors = data;
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
        this.doctors.sort((a, b) => b.ratingValue - a.ratingValue); // descending
        break;
      case 'fees':
        this.doctors.sort((a, b) => a.fees - b.fees); // ascending
        break;
      case 'timeslot':
        this.doctors.sort((a, b) => a.waitingTime - b.waitingTime); // ascending
        break;
    }
  }

  // function to to apply filters
  toggleFilter(filterArray: string[], event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      filterArray.push(value);
    } else {
      const index = filterArray.indexOf(value);
      if (index > -1) filterArray.splice(index, 1);
    }
    console.log('Gender Filters:', this.genderFilters);
    console.log('Service Filters:', this.serviceTypesFilters);

    this.applyFilters(); // تحدث القائمة
  }


  applyFilters() {

    console.log('Applying filters with:', {
    specialization: this.selectedSpecialization,
    government: this.selectedGovernment,
    genderFilters: this.genderFilters,
    serviceTypesFilters: this.serviceTypesFilters
  });

    this.filteredDoctors = this.doctors.filter((doc) => {
      const matchesSpecialization = this.selectedSpecialization === 0 || doc.specializationId === this.selectedSpecialization;
      const matchesGovernment = this.selectedGovernment === 0 || doc.governemntId === this.selectedGovernment;

      const matchesGender = this.genderFilters.length === 0 || this.genderFilters.includes(doc.gender);

      const matchesServiceType = this.serviceTypesFilters.length === 0 || this.serviceTypesFilters.includes(doc.doctorService);

      console.log('SelectedSpecialization:', this.selectedSpecialization);
      console.log('Doctor Spec:', doc.specializationId);

      console.log('SelectedGovernment:', this.selectedGovernment);
      console.log('Doctor Government:', doc.governemntId);
      // const matchesPrice = doc.fees >= this.minPrice && doc.fees <= this.maxPrice;

      // const matchesTime = this.availableTimesFilters.length === 0 || this.availableTimesFilters.some(time => {
      //   const today = new Date();
      //   const slot = new Date(doc.nextAvailableSlot); // Make sure `nextAvailableSlot` exists

      //   switch (time) {
      //     case 'اليوم':
      //       return slot.toDateString() === today.toDateString();
      //     case 'غداً':
      //       const tomorrow = new Date(today);
      //       tomorrow.setDate(tomorrow.getDate() + 1);
      //       return slot.toDateString() === tomorrow.toDateString();
      //     case 'أي يوم':
      //       return true;
      //     default:
      //       return false;
      //   }
      // });

      return matchesSpecialization &&
            matchesGovernment &&
            matchesGender &&
            matchesServiceType;
            // matchesPrice 
            // &&matchesTime;
    });

    console.log('Result:', this.filteredDoctors);
  }


}
