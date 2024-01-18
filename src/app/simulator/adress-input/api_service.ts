import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  createData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }
  getDataByBarcode(barcode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/etapes/${barcode}`);
  }
}
