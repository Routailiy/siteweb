import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envirenement } from 'src/envirenement/envirenement';
import { CityModel } from '../Model/cityModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = envirenement.baseUrl;

  constructor(private http: HttpClient) { }

  getAllCities():Observable<CityModel[]>{
     return  this.http.get<CityModel[]>(this.apiUrl+'allCity');
  }
  getAllCitiesName():Observable<string[]>{
    return  this.http.get<string[]>(this.apiUrl+'distinctCity');
 }
 getAlldistrictByCity(city:string):Observable<CityModel[]>{
  return  this.http.get<CityModel[]>(this.apiUrl+'getDistrictByCity/'+city);
}
}
