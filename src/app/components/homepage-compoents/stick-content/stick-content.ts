import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../shared/services/doctor-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stick-content',
  imports: [CommonModule],
  templateUrl: './stick-content.html',
  styleUrl: './stick-content.css',
})
export class StickContent implements OnInit {
  doctors: any[] = [];
  isLoading = true;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        console.log(data);
        this.doctors = data.filter((doctor) => doctor.ratingValue >= 4);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('err fetching docs', err);
        this.isLoading = false;
      },
    });
  }
}
