import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IRegister } from '../../../models/iregister';
import { RegistrationService } from '../../../shared/services/registration-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',

  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  private registrationService = inject(RegistrationService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isDoctor: [false], // false = patient, true = doctor
    });
  }

  onInit() {
    // Initialize any data or state here
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData: IRegister = this.registerForm.value;
      this.registrationService.registerUser(userData).subscribe({
        next: (response: string) => {
          console.log(response); // response is your string
          this.router.navigate(['/auth/login']); // route to login
        },
        error: (error: any) => {
          console.error('Registration failed', error);
        }
      });
      } else {
        this.registerForm.markAllAsTouched();
      }
    }
}
