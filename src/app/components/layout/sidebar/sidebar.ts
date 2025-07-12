import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  imports: [CommonModule, RouterModule],
})
export class Sidebar {
  private router = inject(Router);

  isSidebarOpen = signal(true);

  darkMode = signal<boolean>(
    JSON.parse(localStorage.getItem('darkMode') ?? 'false')
  );

  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }

  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
  }

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      localStorage.setItem('darkMode', JSON.stringify(isDark));
      document.documentElement.classList.toggle('dark', isDark);
    });
  }
}
