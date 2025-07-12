import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiniFooter } from './mini-footer';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, MiniFooter],
  template: `
    <div
      class="w-full flex flex-col dark:bg-black bg-white dark:text-white text-black min-h-svh"
    >
      <div class="cir_grident">
        <div class="min-h-screen">
          <router-outlet></router-outlet>
        </div>

        <app-mini-footer></app-mini-footer>
      </div>
    </div>
  `,
})
export class AuthLayout {}
