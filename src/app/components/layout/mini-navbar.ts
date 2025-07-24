import { CommonModule } from '@angular/common';
import { Component, effect, HostBinding, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mini-navbar',
  imports: [CommonModule, RouterModule],
  template: `
    <nav
      dir="rtl"
      class="fixed top-20 z-50 w-[100px] bg-white/40 dark:bg-black/40 shadow backdrop-blur-lg rounded-full text-black dark:text-white px-4 py-3 flex items-center justify-center"
    >
      <a
        routerLink="/"
        class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <svg
          class="w-5 h-5 fill-gray-600 dark:fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
          />
          <path
            d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
          />
        </svg>
      </a>

      <button
        type="button"
        class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        (click)="toggleDarkMode()"
        title="change theme"
      >
        <ng-container *ngIf="!darkMode(); else lightTheme">
          <svg class="w-5 h-5 fill-gray-600" viewBox="0 0 20 20">
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>
        </ng-container>
        <ng-template #lightTheme>
          <svg class="w-5 h-5 fill-white" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            />
          </svg>
        </ng-template>
      </button>
    </nav>
  `,
})
export class MiniNavbar {
  darkMode = signal<boolean>(
    JSON.parse(localStorage.getItem('darkMode') ?? 'false')
  );

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
