import { Component } from '@angular/core';
import { ContactForm } from './contact-form/contact-form';
import { ContactInfo } from './contact-info/contact-info';

@Component({
  selector: 'app-contact',
  imports: [ContactForm,ContactInfo],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
   pageTitle = 'اتصل بنا';
}
