import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelayPoint } from '../Model/RelayPointModel';
import { envirenement } from 'src/envirenement/envirenement';

@Injectable({
  providedIn: 'root'
})
export class RelayPointService {

  private apiUrl = envirenement.baseUrl;

  constructor(private http: HttpClient) { }

  getRelayPoints(): Observable<RelayPoint[]>{
    return this.http.get<RelayPoint[]>(this.apiUrl+'allRelayPoint');
  }

}
