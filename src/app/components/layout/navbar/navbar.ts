import { Component, HostBinding, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  isMobMenuOpen = signal(false);
  user = signal<any>(null);
  loginUser() {
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  getDashboardLink(user: any): string {
    const roles = user?.roles ?? [];

    if (roles.includes('Doctor')) {
      return '/dashboard/doctor';
    } else if (roles.includes('Patient')) {
      return '/dashboard/patient';
    } else if (roles.includes('Admin')) {
      return '/dashboard/admin';
    }

    return '/unauthorized';
  }

  darkMode = signal<boolean>(
    JSON.parse(localStorage.getItem('darkMode') ?? 'false')
  );

  toggleMobMenu() {
    this.isMobMenuOpen.update((open) => !open);
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
    this.router.navigate(['/']);
  }

  @HostBinding('class.dark') get dark() {
    return this.darkMode();
  }

  constructor(public router: Router) {
    effect(() => {
      const isDark = this.darkMode();
      localStorage.setItem('darkMode', JSON.stringify(isDark));
      document.documentElement.classList.toggle('dark', isDark);
    });

    // read from localStorage or sessionStorage
    const userStr =
      localStorage.getItem('user') || sessionStorage.getItem('user');

    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        this.user.set(userObj);
      } catch (e) {
        console.error('err', e);
      }
    }
  }

  getEditProfileLink(user: any): string {
    const roles = user?.roles ?? [];

    if (roles.includes('Doctor')) {
      return '/dashboard/doctor/onboarding';
    } else if (roles.includes('Patient')) {
      return '/dashboard/patient/profile';
    } else if (roles.includes('Admin')) {
      return '/dashboard/admin';
    }

    return '/unauthorized';
  }
}
