// login.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  model = {
    username: '',
    password: '',
    remember: false,
  };

  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.loginError = null; // clear previous error

    if (form.valid) {
      const { username, password, remember } = this.model;
      const credentials = { username, password };

      this.authService.login(credentials, remember).subscribe({
        next: (response) => {
          console.log('تم تسجيل الدخول:', response);
        },
        error: (error) => {
          console.error('فشل تسجيل الدخول:', error);
          this.loginError =
            'عفوا فشل تسجيل الدخول: اسم المستخدم أو كلمة المرور غير صحيحة';
        },
      });
    } else {
      this.loginError = 'عفوا .. يرجي ادخال كافة الحقول';
    }
  }
}
