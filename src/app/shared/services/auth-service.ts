import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiBaseUrl}Account/login`;
  constructor(private http: HttpClient, private router: Router) {}

  login(
    credentials: { username: string; password: string },
    remember: boolean
  ): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap((res) => {
        const token = res.token;
        const role = res.roles?.[0]?.toLowerCase(); // first role

        const user = {
          id: res.id,
          userName: res.userName,
          email: res.email,
          phoneNumber: res.phoneNumber,
          roles: res.roles,
          token: res.token,
        };

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        if (remember) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(user));
        }

        setTimeout(() => {
          this.redirectByRole(role);
        });
      })
    );
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  getUser(): any {
    const userData =
      localStorage.getItem('user') || sessionStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  redirectByRole(role: string) {
    switch (role) {
      case 'admin':
        this.router.navigate(['/dashboard/admin']);
        break;
      case 'doctor':
        this.router.navigate(['/dashboard/doctor']);
        break;
      case 'patient':
        this.router.navigate(['/dashboard/patient']);
        break;
      default:
        this.router.navigate(['/auth/login']);
        break;
    }
  }
}
