import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { authInterceptor } from './app/interceptors/auth-interceptor';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideRouter(routes),
    importProvidersFrom(FormsModule),
  ],
});
