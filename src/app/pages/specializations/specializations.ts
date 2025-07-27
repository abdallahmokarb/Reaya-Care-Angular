import { CommonModule } from '@angular/common';
import { Component,OnInit  } from '@angular/core';
import { SpecializationCard } from './specialization-card/specialization-card';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpecializationDTO } from '../../models/SpecializationDTO';
import { Specialization } from '../../shared/services/specialization';


@Component({
  selector: 'app-specializations',
  imports: [CommonModule, SpecializationCard, FontAwesomeModule, RouterModule],
  templateUrl: './specializations.html',
  styleUrl: './specializations.css'
})
export class Specializations implements OnInit {
  specializations: SpecializationDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private specializationService: Specialization) {}

  ngOnInit() {
    this.loadSpecializations();
  }

  loadSpecializations() {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.specializationService.getAllSpecializations().subscribe({
      next: (data) => {
        this.specializations = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load specializations:', err);
        this.errorMessage = 'فشل تحميل التخصصات. يرجى المحاولة مرة أخرى لاحقاً.';
        this.isLoading = false;
      }
    });
  }

  refreshData() {
    this.loadSpecializations();
  }
}
