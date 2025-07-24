import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PatientProfile } from '../../components/patient-profile/patient-profile';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule, PatientProfile],

import { PatientProfile } from '../../components/patient-profile/patient-profile';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule, PatientProfile],

  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  ngOnInit() {}
}
