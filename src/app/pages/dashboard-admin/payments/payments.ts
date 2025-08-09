import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Payment {
  paymentId: number;
  amount: number;
  status: number;
  transactionId: number;
  createdAt: string;
  appointment: any;
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './payments.html',
})
export class Payments implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];

  searchTerm: string = '';
  filterStatus: string = '';
  statusOptions: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Payment[]>('http://localhost:5216/api/Payment')
      .subscribe((data) => {
        this.payments = data;
        this.filteredPayments = data;

        // dynamically create status filter
        this.statusOptions = Array.from(
          new Set(data.map((p) => this.getStatusLabel(p.status)))
        );
      });
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Completed';
      case 2:
        return 'Failed';
      case 3:
        return 'Refunded';
      default:
        return 'Unknown';
    }
  }

  searchAndFilter() {
    this.filteredPayments = this.payments.filter(
      (p) =>
        (this.getStatusLabel(p.status)
          .toLowerCase()
          .includes(this.filterStatus.toLowerCase()) ||
          !this.filterStatus) &&
        (p.transactionId.toString().includes(this.searchTerm) ||
          p.amount.toString().includes(this.searchTerm) ||
          p.createdAt.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          p.paymentId.toString().includes(this.searchTerm))
    );
  }
  getTotalAmount(): number {
    return this.filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  }
}
