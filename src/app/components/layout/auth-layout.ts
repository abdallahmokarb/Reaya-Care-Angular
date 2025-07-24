import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiniFooter } from './mini-footer';
<<<<<<< HEAD
=======
import { MiniNavbar } from './mini-navbar';
>>>>>>> 118c175 (feat: initialize Angular application with basic structure and configurations)

@Component({
  selector: 'app-auth-layout',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, MiniFooter],
=======
  imports: [RouterOutlet, MiniFooter, MiniNavbar],
>>>>>>> 118c175 (feat: initialize Angular application with basic structure and configurations)
  template: `
    <div
      class="w-full flex flex-col dark:bg-black bg-white dark:text-white text-black min-h-svh"
    >
<<<<<<< HEAD
      <div class="cir_grident">
=======
      <div>
        <app-mini-navbar></app-mini-navbar>

>>>>>>> 118c175 (feat: initialize Angular application with basic structure and configurations)
        <div class="min-h-screen">
          <router-outlet></router-outlet>
        </div>

        <app-mini-footer></app-mini-footer>
      </div>
    </div>
  `,
})
export class AuthLayout {}
