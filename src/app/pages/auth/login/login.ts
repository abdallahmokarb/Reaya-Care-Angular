import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule, RouterModule],
})
<<<<<<< HEAD
export class LoginComponent {}
=======
export class LoginComponent {
    model = {
    email: '',
    password: '',
    remember: false
  };
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Data:', this.model);

      // this.authService.login(this.model).subscribe(...)
    } else {
      console.warn('Form is invalid');
    }
  }
}
>>>>>>> 118c175 (feat: initialize Angular application with basic structure and configurations)
