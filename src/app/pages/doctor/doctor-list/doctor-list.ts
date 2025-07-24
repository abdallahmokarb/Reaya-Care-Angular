import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-doctor-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-list.html',
  styleUrls: ['./doctor-list.css']
})
export class DoctorListComponent {
  doctors = [
  {
    id: 1,
    name: 'Dr. Liam',
    image: 'assets/images/Panda.jpg',
    description: 'استشاري جراحة عامة وخبرة 10 سنوات',
    details: 'خبرة في الجراحة العامة والمناظير وحاصل على زمالة الكلية الملكية البريطانية.'
  },
  {
    id: 2,
    name: 'Dr. Noah',
    image: 'assets/images/download.jpg',
    description: 'أخصائي تحاليل طبية',
    details: 'خبرة في المختبرات الطبية، تحليل الدم، وظائف الكبد والكلى، الهرمونات.'
  },
  {
    id: 3,
    name: 'Dr. Isabella',
    image: 'assets/images/download.jpg',
    description: 'طبيبة أطفال وخبرة طويلة',
    details: 'تعمل في طب الأطفال وحديثي الولادة، متخصصة في الأمراض التنفسية والهضمية للأطفال.'
  },
  {
    id: 4,
    name: 'Dr. Sophia',
    image: 'assets/images/Panda.jpg',
    description: 'أخصائية نساء وتوليد',
    details: 'تقدم خدمات النساء والتوليد، متابعة الحمل والولادة الطبيعية والقيصرية.'
  },
  {
    id: 5,
    name: 'Dr. Ava',
    image: 'assets/images/Panda.jpg',
    description: 'استشاري قلب وأوعية دموية',
    details: 'متخصص في أمراض القلب، الأشعة التداخلية، قسطرة القلب.'
  },
  {
    id: 6,
    name: 'Dr. Mia',
    image: 'assets/images/Panda.jpg',
    description: 'أخصائية جلدية وتجميل',
    details: 'تقدم خدمات الجلدية والتجميل، علاج حب الشباب، الليزر.'
  }
    
];

  constructor(private router: Router) {}

  bookAppointment(doctor: any) {
    this.router.navigate(['/confirm'], {
      state: { doctor }
    });
  }
}
