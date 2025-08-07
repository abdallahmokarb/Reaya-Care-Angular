import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-refund-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refund-details.html',
  styleUrls: ['./refund-details.css'],
})
export class RefundDetails {
  refundData: any;

  constructor(private route: ActivatedRoute) {
    const navigation = history.state;
    this.refundData = navigation.refund || {};
  }

  printPage() {
    window.print();
  }
}
