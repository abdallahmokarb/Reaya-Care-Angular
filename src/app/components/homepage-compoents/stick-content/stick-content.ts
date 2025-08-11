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
        this.doctors = data.filter((doctor) => doctor.ratingValue >= 3);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('err fetching docs', err);
        this.isLoading = false;
      },
    });
  }

  getStars(rating: number): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) stars.push('full');
    if (hasHalfStar) stars.push('half');
    for (let i = 0; i < emptyStars; i++) stars.push('empty');

    return stars;
  }
}
