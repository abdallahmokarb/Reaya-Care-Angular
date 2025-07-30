import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingService } from '../../shared/services/rating-service';
import { Irating } from '../../models/irating';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-rating-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './rating-form.html',
  styleUrl: './rating-form.css'
})
export class RatingForm {

  @Output() ratingSubmitted = new EventEmitter<Irating>();

  ratingService = inject(RatingService);
  route = inject(ActivatedRoute)

  stars = Array(5).fill(0);
  ratingValue = 0;
  hoverRating = 0;
  comment = '';

  setRating(value: number) {
    this.ratingValue = value;
  }
  

  submit() {
    const userJson = sessionStorage.getItem('user');
    let patientId = null;

    if (userJson) {
      const userObj = JSON.parse(userJson);
      patientId = userObj.id;
    }


    const rating: Irating = {
      ratingValue: this.ratingValue * 2,
      comment: this.comment,
      doctorId: Number(this.route.snapshot.paramMap.get('id')),   // You should pass or set this in the component
    };

    this.ratingService.addRating(rating).subscribe({
      next: () => {
        this.ratingSubmitted.emit(rating);
      },
      error: (err) => {
        console.error('Error submitting rating:', err);
      }
    });

  }

}
