import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiniFooter } from './mini-footer';
import { MiniNavbar } from './mini-navbar';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, MiniFooter, MiniNavbar],
  template: `
    <div
      class="w-full flex flex-col dark:bg-black bg-white dark:text-white text-black min-h-svh"
    >
      <div>
        <app-mini-navbar></app-mini-navbar>

        <div class="min-h-screen">
          <router-outlet></router-outlet>
        </div>

        <app-mini-footer></app-mini-footer>
      </div>
    </div>
  `,
})
export class AuthLayout {}
