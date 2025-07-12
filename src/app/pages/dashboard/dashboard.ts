import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  ngOnInit() {}
}
