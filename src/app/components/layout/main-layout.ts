import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Sidebar } from './navbar/sidebar/sidebar';
import { MiniFooter } from './mini-footer';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Footer, Sidebar, MiniFooter],
  template: `
    <div
      class="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white"
    >
      <ng-container *ngIf="isDashboardRoute(); else mainNavbar">
        <app-sidebar />
      </ng-container>
      <ng-template #mainNavbar>
        <app-navbar />
      </ng-template>

      <main class="flex-grow cir_grident min-h-screen">
        <router-outlet></router-outlet>
      </main>

      <ng-container *ngIf="isDashboardRoute(); else mainFooter">
        <app-mini-footer />
      </ng-container>
      <ng-template #mainFooter>
        <app-footer />
      </ng-template>
    </div>
  `,
})
export class MainLayout {
  constructor(private router: Router) {}

  isDashboardRoute(): boolean {
    return this.router.url.includes('/dashboard');
  }
}
