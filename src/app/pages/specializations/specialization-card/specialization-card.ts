import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpecializationDTO } from '../../../models/SpecializationDTO';

@Component({
  selector: 'app-specialization-card',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './specialization-card.html',
  styleUrl: './specialization-card.css'
})
export class SpecializationCard {
  @Input() specialization!: SpecializationDTO;
}
