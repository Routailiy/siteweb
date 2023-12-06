import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';
import { RelayPoint } from 'src/app/Model/RelayPointModel';
import { MapService } from 'src/app/services/map.service';
import { RelayPointService } from 'src/app/services/relay-point.service';

@Component({
  selector: 'app-relay-point-map',
  templateUrl: './relay-point-map.component.html',
  styleUrls: ['./relay-point-map.component.css']
})
export class RelayPointMapComponent {
  @Input() address! : string;
  relayPoints: RelayPoint[]= [];
  zoom = 14;
  center!: google.maps.LatLngLiteral;
markerOptions: google.maps.MarkerOptions = {
  draggable: false
};
  constructor(private relayPointService: RelayPointService, private mapService: MapService, private http: HttpClient) { }

   ngOnInit() {    
  this.relayPointService.getRelayPoints().subscribe((results :RelayPoint[])=>{
    results.forEach( (relayPoint : RelayPoint) => {
      relayPoint.position =  {lat:relayPoint.latitude, lng: relayPoint.longitude };
      this.relayPoints.push(relayPoint);
    })
  });
  }
  private apiUrl = 'http://localhost:3000/obtenir-points-relais';  
  getRelayPointsFromDatabase(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
 async  onMarkerClick(relayPoint:RelayPoint){
  const placeId = await this.mapService.getPlaceIdByLatLng(relayPoint.position.lat, relayPoint.position.lng);
  console.log('Place ID:', placeId);
  console.log('position', relayPoint.position.lat, relayPoint.position.lng);
   // Get place details using the retrieved Place ID
   const placeDetails = await this.mapService.getPlaceDetails(placeId);
   console.log('Place details:', placeDetails);
 } catch (error:any) {
   console.error('Error:', error);
 }
 
   async ngOnChanges() {
    if (this.address) {
      this.center= await this.mapService.getLatLng(this.address);
      const origin = await this.mapService.getLatLng(this.address);
      const closePoint = this.mapService.findClosestRelayPoints(origin,this.relayPoints,100);
      console.log("close point ", closePoint);
    }
  }

   
}
