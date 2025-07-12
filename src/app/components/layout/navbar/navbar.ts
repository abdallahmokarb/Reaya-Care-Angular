import { Component, HostBinding, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  isMobMenuOpen = signal(false);

  darkMode = signal<boolean>(
    JSON.parse(localStorage.getItem('darkMode') ?? 'false')
  );

  toggleMobMenu() {
    this.isMobMenuOpen.update((open) => !open);
  }

  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
  }

  @HostBinding('class.dark') get dark() {
    return this.darkMode();
  }

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      localStorage.setItem('darkMode', JSON.stringify(isDark));
      document.documentElement.classList.toggle('dark', isDark);
    });
  }
}
