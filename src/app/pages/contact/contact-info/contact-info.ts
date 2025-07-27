import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  imports: [CommonModule],
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.css'
})
export class ContactInfo {
  contactInfo = {
    email: 'support@resaya.com',
    phone: '+20 000 000 1002',
    address: 'المنيا، مصر'
  };
}
