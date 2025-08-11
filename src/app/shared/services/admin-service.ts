import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth-service';
import {
  AdminCreateDTO,
  AdminDTO,
  AdminUpdateDTO,
} from '../../models/Admin/AdminDTOs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'https://care.runasp.net/api';

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<AdminDTO[]> {
    return this.http
      .get<AdminDTO[]>(`${this.apiUrl}/Admin`)
      .pipe(catchError(this.handleError));
  }

  createAdmin(admin: Omit<AdminCreateDTO, 'systemId'>): Observable<any> {
    const payload: AdminCreateDTO = { ...admin, systemId: 0 };
    return this.http
      .post(`${this.apiUrl}/Account/register-admin`, payload, {
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          try {
            return JSON.parse(response);
          } catch (e) {
            return { message: response || 'Success' };
          }
        }),
        catchError(this.handleError)
      );
  }

  updateAdmin(
    id: number,
    admin: Omit<AdminUpdateDTO, 'systemId'>
  ): Observable<any> {
    const payload: AdminUpdateDTO = { ...admin, systemId: 0 };
    return this.http
      .put(`${this.apiUrl}/Admin/${id}`, payload, {
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          try {
            return JSON.parse(response);
          } catch (e) {
            return { message: response || 'Success' };
          }
        }),
        catchError(this.handleError)
      );
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/Admin/${id}`, {
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          try {
            return JSON.parse(response);
          } catch (e) {
            return { message: response || 'Success' };
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'حدث خطأ غير متوقع';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `خطأ: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = 'فشل الاتصال بالخادم. تحقق من الشبكة.';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'بيانات غير صحيحة';
      } else if (error.status === 401 || error.status === 403) {
        errorMessage = 'غير مصرح لك';
      } else if (error.status === 500) {
        errorMessage = error.error?.message || 'خطأ في الخادم';
      } else if (error.error instanceof ProgressEvent) {
        errorMessage = 'فشل تحليل استجابة الخادم';
      } else {
        errorMessage = error.error?.message || `خطأ: ${error.statusText}`;
      }
    }

    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
