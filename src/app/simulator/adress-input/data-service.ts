//data-service
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from './data.model'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getData(): Observable<Data[]> {
    return this.http.get<Data[]>('/assets/relay.json'); // Chemin mis à jour
  }
}
