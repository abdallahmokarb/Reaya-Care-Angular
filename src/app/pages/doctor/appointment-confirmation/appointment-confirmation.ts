import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointment-confirmation',
  imports: [],
  templateUrl: './appointment-confirmation.html',
  styleUrl: './appointment-confirmation.css'
})
export class AppointmentConfirmation {
 doctor: any;

  constructor(private location: Location) {
    const nav = window.history.state;
    this.doctor = nav?.doctor || null;
  }

  goBack() {
    this.location.back();
  }
}
