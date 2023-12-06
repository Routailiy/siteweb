import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { RelayPoint } from 'src/app/Model/RelayPointModel';
import { MapService } from 'src/app/services/map.service';
import { RelayPointService } from 'src/app/services/relay-point.service';
import { relayPointInfo } from '../../Model/relayPointInfo';

@Component({
  selector: 'app-popup-map',
  templateUrl: './popup-map.component.html',
  styleUrls: ['./popup-map.component.css']
})
export class PopupMapComponent implements  AfterViewInit{
  @Input() address! : string;
  @Input() fromHomePage:boolean =false;
  @Output() selectedRelayPoint = new EventEmitter<RelayPoint>();
   relayPoints: RelayPoint[]=[];
  zoom = 14;
  closePoints!: RelayPoint[];
  center!: google.maps.LatLngLiteral;
  adressLise:string[] =[];
markerOptions: google.maps.MarkerOptions = {
  icon: this.getCustomMarkerIcon('green', 42), // Set the color and size here
  draggable: true,
};
  constructor(private relayPointService: RelayPointService, private mapService: MapService) { }
  

   ngOnInit() {    
  this.relayPointService.getRelayPoints().subscribe((results :RelayPoint[])=>{
    results.forEach( (relayPoint : RelayPoint) => {
      relayPoint.position =  {lat:relayPoint.latitude, lng: relayPoint.longitude };
      this.relayPoints.push(relayPoint);
    })
  });
  }
 async ngAfterViewInit() {
    
  }
  
  
  async  onMarkerClick(relayPoint:RelayPoint){
  const placeId = await this.mapService.getPlaceIdByLatLng(relayPoint.position.lat, relayPoint.position.lng);
  console.log('Place ID:', placeId);
  console.log('position', relayPoint.position.lat, relayPoint.position.lng);
   // Get place details using the retrieved Place ID
   const placeDetails = await this.mapService.getPlaceDetails(placeId);
   console.log('Place details:', placeDetails);
 } 

 async RelayPointDetail(relayPoint:RelayPoint){
  const placeId = await this.mapService.getPlaceIdByLatLng(relayPoint.position.lat, relayPoint.position.lng);
  const placeDetails = await this.mapService.getPlaceDetails(placeId);
  relayPoint.openingHoures=placeDetails.opening_hours?.weekday_text;
  relayPoint.adress=placeDetails.formatted_address;
  let a=<string>relayPoint.adress;
   this.adressLise.push(a);
   console.log(this.adressLise)
 }
async ngOnChanges() {
    if (this.address) {
      this.center= await this.mapService.getLatLng(this.address);
      const origin = await this.mapService.getLatLng(this.address);
      this.closePoints = this.mapService.findClosestRelayPoints(origin,this.relayPoints,2);
       this.closePoints.forEach( r => 
          this.RelayPointDetail(r)
      );
    }
  }
selectRelayPoint(relayPoint:RelayPoint){
this.selectedRelayPoint.emit(relayPoint)
}
getCustomMarkerIcon(color: string, size: number): google.maps.Icon {
  return {
    url: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    scaledSize: new google.maps.Size(size, size),
  };
}
}