import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(
    this.getInitialTheme()
  );
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.applyTheme(this.darkModeSubject.value);
  }

  toggleDarkMode(): void {
    const currentTheme = !this.darkModeSubject.value;
    this.darkModeSubject.next(currentTheme);
    this.applyTheme(currentTheme);
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  private getInitialTheme(): boolean {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') return false;
    return true;
  }

  private applyTheme(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
