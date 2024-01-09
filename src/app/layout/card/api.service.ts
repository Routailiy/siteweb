import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000'; // URL de votre API Flask

  constructor(private http: HttpClient) { }

  trackPackage(trackingNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/track_package/${trackingNumber}`);
  }
}
