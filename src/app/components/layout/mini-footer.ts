import { Component } from '@angular/core';

@Component({
  selector: 'app-mini-footer',
  standalone: true,
  template: `

   
    <nav class="bg-gray-800/50 text-center text-black dark:text-white p-4">
      <div class="text-lg ">
        <span class="font-bold">
          البوابة الالكترونية لـ رعاية . كوم - جميع الحقوق محفوظة © 2025
        </span>

      </div>
    </nav>
  `,
})
export class MiniFooter {}
