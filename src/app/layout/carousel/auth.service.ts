import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:5000/login';
  private userName = new BehaviorSubject<string>('');
  router: any;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  setUserName(name: string) {
    this.userName.next(name);
  }

  getUserName(): Observable<string> {
    return this.userName.asObservable();
  }
  setUid(uid: string) {
    this.userName.next(uid);
  }
  getUid(): Observable<string> {
    return this.userName.asObservable();
  }
  logout() {
    localStorage.removeItem('name'); 
    window.location.href = 'index.html'; 
   }
}
