import { Component, Input } from '@angular/core';
import { TrackingInfo } from '../tracking/tracking.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
adress!:string;
@Input() trackingData: TrackingInfo[] = [];
onTrackingDataReceived(trackingData: TrackingInfo[]) {
  this.trackingData = trackingData;
}
addAdress(event:string){
   this.adress=event;
  }
}
