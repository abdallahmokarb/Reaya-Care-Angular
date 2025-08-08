import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  imports: [CommonModule, RouterModule],
})
export class Sidebar {
  private router = inject(Router);
  isSidebarOpen = signal(true);
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

  // 👇 Now includes 'admin'
  dashboardType = signal<'doctor' | 'patient' | 'admin' | null>(null);

  constructor() {
    const path = this.router.url;

    if (path.includes('/dashboard/doctor')) {
      this.dashboardType.set('doctor');
    } else if (path.includes('/dashboard/patient')) {
      this.dashboardType.set('patient');
    } else if (path.includes('/dashboard/admin')) {
      this.dashboardType.set('admin');
    }

    // Watch dark mode toggle
    effect(() => {
      const isDark = this.darkMode();
      localStorage.setItem('darkMode', JSON.stringify(isDark));
      document.documentElement.classList.toggle('dark', isDark);
    });
  }
}
