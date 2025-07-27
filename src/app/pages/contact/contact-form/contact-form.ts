import { CommonModule } from '@angular/common';
import { Component ,EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { emailValidator } from '../../../shared/utils/form-validators';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
   contactForm: FormGroup;
  isSubmitting = false;
  formSubmitted = false;
  formError = false;
  @Output() submitted = new EventEmitter<boolean>();

  roles = [
    { value: '', label: 'اختر دورك' },
    { value: 'patient', label: 'مريض' },
    { value: 'doctor', label: 'طبيب' },
    { value: 'other', label: 'آخر' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, emailValidator()]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      role: ['']
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.formError = false;
      
      // Simulate API call
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% chance of success for demo
        
        if (success) {
          this.formSubmitted = true;
          this.submitted.emit(true);
          this.contactForm.reset();
        } else {
          this.formError = true;
        }
        
        this.isSubmitting = false;
      }, 1500);
    }
  }
}
