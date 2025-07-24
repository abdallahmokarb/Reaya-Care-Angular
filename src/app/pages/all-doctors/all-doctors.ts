import { Component } from '@angular/core';

@Component({
  selector: 'app-all-doctors',
  imports: [],
  templateUrl: './all-doctors.html',
  styleUrl: './all-doctors.css'
})
export class AllDoctors {
  doctors = [
  {
    name: "أحمد يوسف",
    specialization: "أخصائي الأمراض الجلدية",
    availability: "الانتظار 30 دقيقة",
    serviceType: "العيادة",
    location: "المنيا, ميدان بالاس",
    price: 250,
    rating: 4.5,
    image: "/assets/images/Doc1.jpg"
  },
  {
    name: "علي جمال",
    specialization: "أخصائي انف واذن وحنجرة",
    availability: "الانتظار 30 دقيقة",
    serviceType: "العيادة",
    location: "المنيا, مضرب الرز",
    price: 350,
    rating: 4.9,
    image: "/assets/images/Doc2.jpg"
  },
  {
    name: "هبة احمد",
    specialization: "أخصائي نساء وتوليد",
    availability: "الانتظار 30 دقيقة",
    serviceType: "العيادة",
    location: "المنيا, ميدان بالاس",
    price: 250,
    rating: 4.1,
    image: "/assets/images/Doc3.jpg"
  },
  {
    name: "منى سامي",
    specialization: "أخصائية طب الأطفال",
    availability: "الانتظار 15 دقيقة",
    serviceType: "اونلاين",
    location: "القاهرة, التجمع الخامس",
    price: 400,
    rating: 4.8,
    image: "/assets/images/Doc4.jpg"
  },
  // Add more doctors...
];

toggleFilters(): void {
    const sidebar = document.getElementById('filterSidebar');
    if (sidebar) {
      sidebar.classList.toggle('translate-x-full');
    }
  }

}
