import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.html',
})
export class Unauthorized {
  constructor(private router: Router, private location: Location) {}

  goBack() {
    this.location.back();
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
