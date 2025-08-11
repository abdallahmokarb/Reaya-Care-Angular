import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SystemInfoService {
  private apiUrl = 'https://care.runasp.net/api/SystemInfo/CalcBalance';

  constructor(private http: HttpClient) {}

  getSystemInfo() {
    return this.http.put(this.apiUrl, { responseType: 'text' }); // responsetype as text
  }
}
