import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Irating } from '../../models/irating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private baseUrl = 'http://localhost:5216/api/Rating'; // 👈 Update this to your real API URL
  constructor(private http: HttpClient) {}

  getAllDoctorRatings(doctorID: number): Observable<Irating[]> {
    return this.http.get<Irating[]>(`${this.baseUrl}/doctor/${doctorID}`);
  }


  getRatingAsStars(rating: number | undefined): string[] {

    if (rating === undefined || rating < 0) {
      const emptyStars = 5;
      return Array(emptyStars).fill('fas fa-star emptystar');
    }

    const fullStars = Math.floor(rating/2);
    const emptyStars = 5 - fullStars;

    return [
      ...Array(fullStars).fill('fas fa-star fullstar'),
      ...Array(emptyStars).fill('fas fa-star emptystar'),
    ];
  }

  addRating(rating: Irating): Observable<Irating> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<Irating>('http://localhost:5216/api/Patient/AddRating', rating, { headers });
  }

  }

