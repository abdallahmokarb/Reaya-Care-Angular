import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf],
  templateUrl: './doctor-details.html',
  styleUrls: ['./doctor-details.css']
})
export class DoctorDetails {
  route = inject(ActivatedRoute);

  doctorId = Number(this.route.snapshot.paramMap.get('id')); // تأكد أنه رقم

  doctors: Doctor[] = [
    {
      id: 1,
      name: 'د. خالد ماهر',
      image: 'assets/images/doctor.jpg',
      description: 'طبيب قلب وأوعية دموية بخبرة تزيد عن 10 سنوات.',
      specialization: 'أمراض القلب',
      experience: '10 سنوات',
      phone: '01001234567',
      email: 'doctor@example.com'
    },
    {
      id: 2,
      name: 'د. أحمد علي',
      image: 'assets/images/Panda.jpg',
      description: 'أخصائي جراحة عامة بخبرة 8 سنوات.',
      specialization: 'جراحة عامة',
      experience: '8 سنوات',
      phone: '01007654321',
      email: 'doctor2@example.com'
    },
    {
      id: 3,
      name: 'د. سارة محمد',
      image: 'assets/images/download.jpg',
      description: 'طبيبة أطفال بخبرة 5 سنوات.',
      specialization: 'طب الأطفال',
      experience: '5 سنوات',
      phone: '01009876543',
      email: 'doctor3@example.com'
    },
    {
      id: 4,
      name: 'د. ليلى حسن',
      image: 'assets/images/Panda.jpg',
      description: 'أخصائية نساء وتوليد بخبرة 7 سنوات.',
      specialization: 'نساء وتوليد',
      experience: '7 سنوات',
      phone: '01004567890',
      email: 'doctor4@example.com'
    },
    {
      id: 5,
      name: 'د. يوسف علي',
      image: 'assets/images/doctor3.jpg',
      description: 'أخصائي جراحة عظام بخبرة 6 سنوات.',
      specialization: 'جراحة عظام',
      experience: '6 سنوات',
      phone: '01001234567',
      email: 'doctor5@example.com'
    },
    {
      id: 6,
      name: 'د. مريم سعيد',
      image: 'assets/images/download.jpg',
      description: 'طبيبة جلدية بخبرة 4 سنوات.',
      specialization: 'طب الجلدية',
      experience: '4 سنوات',
      phone: '01007654321',
      email: 'doctor6@example.com',
    }
  ];

  doctor?: Doctor = this.doctors.find(d => d.id === this.doctorId);
}
