import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorService } from '../../shared/services/doctor-service';
import { Idoctor } from '../../models/idoctor';
import { Specialization } from '../../shared/services/specialization';
import { ISpecialization } from '../../models/ispecialization';
import { SpecializationDTO } from '../../models/SpecializationDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../shared/services/address-service';
import { Igovernment } from '../../igovernment';

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

  doctors: Idoctor[] = [];
  isLoading = true;
  specializations: SpecializationDTO[] = [];
  selectedSpecialization: number = 0;

  governments: Igovernment[] = [];
  selectedGovernment: number = 0;




ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
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

}
