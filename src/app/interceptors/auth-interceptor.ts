import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../shared/services/auth-service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('%c[Interceptor] Running...', 'color: green');

  // استخدم دالة getToken الموحدة
  const token = authService.getToken();
  console.log('%c[Interceptor] Token:', 'color: green', token);

  // فقط أضف الهيدر إذا لم يكن موجود مسبقًا
  if (token && !req.headers.has('Authorization')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  console.log('%c[Interceptor] Request with Token:', 'color: orange', req);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('%c[Interceptor] HTTP Error:', 'color: red', error);

      // في حالة عدم التفويض: سجل خروج المستخدم وأعد توجيهه
      if (error.status === 401 || error.status === 403) {
        console.warn('[Interceptor] Unauthorized. Redirecting to login...');
        authService.logout();
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};
