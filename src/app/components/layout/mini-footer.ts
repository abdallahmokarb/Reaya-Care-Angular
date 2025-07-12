import { Component } from '@angular/core';

@Component({
  selector: 'app-mini-footer',
  standalone: true,
  template: `
    <nav class="bg-gray-800/50 text-center text-white p-4">
      <div class="text-lg ">
        <span class="font-bold"> جميع الحقوق محفوظة 2025 </span>
      </div>
    </nav>
  `,
})
export class MiniFooter {}
