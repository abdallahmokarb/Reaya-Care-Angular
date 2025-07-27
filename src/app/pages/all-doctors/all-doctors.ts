import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorService } from '../../shared/services/doctor-service';
import { Idoctor } from '../../models/idoctor';

@Component({
  selector: 'app-all-doctors',
  imports: [RouterModule],
  templateUrl: './all-doctors.html',
  styleUrl: './all-doctors.css'
})
export class AllDoctors implements OnInit {

  private doctorService = inject(DoctorService);
  doctors: Idoctor[] = [];
  isLoading = true;

//   doctors = [
//   {
//     id: 1,
//     name: "أحمد يوسف",
//     specialization: "أخصائي الأمراض الجلدية",
//     availability: "الانتظار 30 دقيقة",
//     serviceType: "العيادة",
//     location: "المنيا, ميدان بالاس",
//     price: 250,
//     rating: 4.5,
//     image: "/assets/images/Doc1.jpg"
//   },
//   {
//     id: 2,
//     name: "علي جمال",
//     specialization: "أخصائي انف واذن وحنجرة",
//     availability: "الانتظار 30 دقيقة",
//     serviceType: "العيادة",
//     location: "المنيا, مضرب الرز",
//     price: 350,
//     rating: 4.9,
//     image: "/assets/images/Doc2.jpg"
//   },
//   {
//     id: 3,
//     name: "هبة احمد",
//     specialization: "أخصائي نساء وتوليد",
//     availability: "الانتظار 30 دقيقة",
//     serviceType: "العيادة",
//     location: "المنيا, ميدان بالاس",
//     price: 250,
//     rating: 4.1,
//     image: "/assets/images/Doc3.jpg"
//   },
//   {
//     id: 4,
//     name: "منى سامي",
//     specialization: "أخصائية طب الأطفال",
//     availability: "الانتظار 15 دقيقة",
//     serviceType: "اونلاين",
//     location: "القاهرة, التجمع الخامس",
//     price: 400,
//     rating: 4.8,
//     image: "/assets/images/Doc4.jpg"
//   },
//   // Add more doctors...
// ];

ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
        this.isLoading = false;
      }
    });
  }

toggleFilters(): void {
    const sidebar = document.getElementById('filterSidebar');
    if (sidebar) {
      sidebar.classList.toggle('translate-x-full');
    }
  }

}
