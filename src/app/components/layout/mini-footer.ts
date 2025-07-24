import { Component } from '@angular/core';

@Component({
  selector: 'app-mini-footer',
  standalone: true,
  template: `
<<<<<<< HEAD
    <nav class="bg-gray-800/50 text-center text-white p-4">
      <div class="text-lg ">
        <span class="font-bold"> جميع الحقوق محفوظة 2025 </span>
=======
    <nav class="bg-gray-800/50 text-center text-black dark:text-white p-4">
      <div class="text-lg ">
        <span class="font-bold">
          البوابة الالكترونية لـ رعاية . كوم - جميع الحقوق محفوظة © 2025
        </span>
>>>>>>> 118c175 (feat: initialize Angular application with basic structure and configurations)
      </div>
    </nav>
  `,
})
export class MiniFooter {}
