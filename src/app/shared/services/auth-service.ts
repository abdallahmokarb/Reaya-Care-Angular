import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //only fake api for tasting
  private readonly apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';  //fake API URL
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }, remember: boolean): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(res => {
        const token = res.token;
        const role = res.role?.toLowerCase();

        if (remember) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }

        this.redirectByRole(role);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  redirectByRole(role: string) {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'doctor':
        this.router.navigate(['/dashboard']);
        break;
      default:
        this.router.navigate(['/appointments']);
    }
  }
}
