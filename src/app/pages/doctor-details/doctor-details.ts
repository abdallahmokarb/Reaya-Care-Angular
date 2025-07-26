import { Component, inject, OnInit } from '@angular/core';
import { Idoctordetails } from '../../models/idoctordetails';
import { DoctorService } from '../../shared/services/doctor-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-details',
  imports: [],
  templateUrl: './doctor-details.html',
  styleUrl: './doctor-details.css'
})
export class DoctorDetails implements OnInit {
  doctorId!: number;
  doctor?: Idoctordetails;
  isLoading = true;

  route = inject(ActivatedRoute);
  doctorService = inject(DoctorService);

  ngOnInit(): void {
    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (data) => {
        this.doctor = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching doctor details:', err);
        this.isLoading = false;
      }
    });
  }

}
