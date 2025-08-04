import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/layout/navbar/navbar';
import { Footer } from './components/layout/footer/footer';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './shared/services/theme.service';
import { LoginComponent } from './pages/auth/login/login';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Inject shared services
  themeService = inject(ThemeService);

  isDarkMode = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Theme listener
    this.themeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
    // nav to top
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
}
