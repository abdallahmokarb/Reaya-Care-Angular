import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  imports: [CommonModule, RouterModule],
})
export class Sidebar {
  private router = inject(Router);
  isSidebarOpen = signal(false);
  user = signal<any>(null);

  darkMode = signal<boolean>(
    JSON.parse(localStorage.getItem('darkMode') ?? 'false')
  );

  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }

  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
  }

  logout() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.user.set(null);
    this.router.navigate(['/auth/login']);
  }

  dashboardType = signal<'doctor' | 'patient' | null>(null);

  constructor() {
    const path = this.router.url;
    if (path.includes('/dashboard/doctor')) {
      this.dashboardType.set('doctor');
    } else if (path.includes('/dashboard/patient')) {
      this.dashboardType.set('patient');
    }

    // watch dark mode
    effect(() => {
      const isDark = this.darkMode();
      localStorage.setItem('darkMode', JSON.stringify(isDark));
      document.documentElement.classList.toggle('dark', isDark);
    });
  }
}
