import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SystemInfoService {
  private apiUrl = 'http://localhost:5216/api/SystemInfo';

  constructor(private http: HttpClient) {}

  getSystemInfo() {
    return this.http.get(this.apiUrl, { responseType: 'text' }); // responsetype as text
  }
}
