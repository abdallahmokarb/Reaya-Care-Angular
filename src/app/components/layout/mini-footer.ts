import { Component } from '@angular/core';

@Component({
  selector: 'app-mini-footer',
  standalone: true,
  template: `
    <nav
      class="dark:bg-gray-800/50 backdrop-blur-lg bg-black/10 text-black dark:text-white text-center p-4 fixed bottom-0 w-full "
    >
      <div class="text-lg ">
        <span class="font-bold">
          البوابة الالكترونية لـ رعاية . كوم - جميع الحقوق محفوظة © 2025
        </span>
      </div>
    </nav>
  `,
})
export class MiniFooter {}
