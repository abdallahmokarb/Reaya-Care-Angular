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
        const role = res.roles?.[0]?.toLowerCase();
        const redirectUrl = this.getRedirectUrl();
        this.clearRedirectUrl();
        const user = {
          id: res.id,
          userName: res.userName,
          email: res.email,
          phoneNumber: res.phoneNumber,
          roles: res.roles,
          token: res.token,
          doctorId: res.doctorinfo,
          patientId: res.patientinfo,
        };

        localStorage.clear();
        sessionStorage.clear();

        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('token', res.token);
        storage.setItem('user', JSON.stringify(user));

        setTimeout(() => {
          if (redirectUrl) {
            this.router.navigateByUrl(redirectUrl);
          } else {
            this.redirectByRole(role);
          }
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
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log('%c[AuthService] token:', 'color: blue', token);
    return token;
  }

  getUser(): any {
    const user = sessionStorage.getItem('user') || localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
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
        this.router.navigate(['/']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }

  private redirectUrl: string | null = null;

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
    sessionStorage.setItem('redirectUrl', url);
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl || sessionStorage.getItem('redirectUrl');
  }

  clearRedirectUrl() {
    this.redirectUrl = null;
    sessionStorage.removeItem('redirectUrl');
  }
}
