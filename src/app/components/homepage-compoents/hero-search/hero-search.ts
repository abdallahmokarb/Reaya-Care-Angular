import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-search',
  imports: [CommonModule],
  templateUrl: './hero-search.html',
  styleUrls: ['./hero-search.css'],
})
export class HeroSearch {
  activeTab: 'find' | 'video' | 'homeVisit' = 'find';

  setActiveTab(tab: 'find' | 'video' | 'homeVisit') {
    this.activeTab = tab;
  }
}
