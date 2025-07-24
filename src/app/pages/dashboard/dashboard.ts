import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule],
=======
import { PatientProfile } from '../../components/patient-profile/patient-profile';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule, PatientProfile],
>>>>>>> 118c175 (feat: initialize Angular application with basic structure and configurations)
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  ngOnInit() {}
}
