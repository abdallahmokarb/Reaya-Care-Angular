import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule, RouterModule],
})

export class LoginComponent {
    model = {
    email: '',
    password: '',
    remember: false
  };

  constructor(private authService: AuthService) {}

  onSubmit(form: any) {
    if (form.valid) {
      const credentials = {
        email: this.model.email,
        password: this.model.password
      };

      console.log('Form Data:', this.model);

      this.authService.login(credentials, this.model.remember).subscribe(
        response => {
          console.log('Login successful:', response);
        },
        error => {
          console.error('Login failed:', error);
        }
      );

    } else {
      console.warn('Data is invalid');
    }
  }
}