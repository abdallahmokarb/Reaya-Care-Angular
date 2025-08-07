import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Sidebar } from './sidebar/sidebar';
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
        <div class="flex flex-grow min-h-screen">
          <app-sidebar class="md:w-64 md:shrink-0  " />
          <main class="flex-grow p-4">
            <router-outlet></router-outlet>
            <br />
            <br />
            <br />
          </main>
        </div>
      </ng-container>

      <ng-template #mainNavbar>
        <app-navbar />
        <main class="flex-grow cir_grident min-h-screen">
          <router-outlet></router-outlet>
        </main>
      </ng-template>

      <ng-container *ngIf="isDashboardRoute(); else mainFooter">
        <div class="relative z-[100] ">
          <app-mini-footer />
        </div>
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
