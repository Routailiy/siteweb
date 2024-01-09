import { Component, EventEmitter, Output ,ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { DataService } from '../../simulator/adress-input/data-service';
import { Data } from '../../simulator/adress-input/data.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { TrackingInfo } from '../tracking/tracking.model';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
@Output() adressEmitter = new EventEmitter<string>();
weight!:number;
pointsOfSale: any[] = [];
center!: google.maps.LatLngLiteral;
  zoom = 14;

adress!:string;
trackingNumber: string = '';
trackingData: any[] = [];
showTrackingModal: boolean = false;

data: Data[] = [];  
markers: { position: google.maps.LatLngLiteral, options?: google.maps.MarkerOptions,  code_es: number, agence: string, Adresse: string,  distance?: string }[] = [];
selectedDestination!: string;
isSmallText: boolean = true;
errorMessage: string = ''; // Ajoutez cette ligne
 
markerPosition!: google.maps.LatLngLiteral;
mapOptions: google.maps.MapOptions = {
  center: { lat: 33.5731, lng: -7.5898 },
  zoom: 6 
};

constructor(private router: Router,private dataService: DataService,private changeDetectorRef: ChangeDetectorRef,private http: HttpClient,private apiService: ApiService) { }
ngOnInit(): void {

  this.dataService.getData().subscribe(data => {
    this.pointsOfSale = data;
  });


  this.dataService.getData().subscribe(data => {
    this.data = data;
  });

}
sendLocated() {
  if (this.selectedDestination === 'Maroc') {
    window.location.href = 'https://test.sapress.mobiblanc.tech';
  } else if (this.selectedDestination === 'Etranger') {
    window.location.href = 'https://shipiin.2023.alis218.sg-host.com/';
  }
}
sendWeight(){
  this.weight?this.router.navigate(['/simulateur', this.weight]):this.router.navigate(['/simulateur']);
}
addAdress(adress: string) {
  this.geocodeByStreet(adress).then(() => {
    this.showPointsModal = true;
    this.changeDetectorRef.detectChanges(); // Force la détection de changements
    console.log("Modal should be shown now");
  }).catch(error => {
    console.error('Error during geocoding:', error);
  });
}



geocodeByStreet(adress: string): Promise<void> {
  return new Promise((resolve, reject) => {
    this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(adress)}&key=AIzaSyBqimHieAKQubjYTPyEiVhMx56kLMMQbeE`).subscribe(
      data => {
        if (data.status === 'OK') {
          const location = data.results[0].geometry.location;
          this.updateMap(location.lat, location.lng);
          this.displayNearbyPointsOfSale(location);
          resolve();
        } else {
          console.error('Geocoding failed:', data.status);
          reject('Geocoding failed');
        }
      },
      err => {
        console.error('Error calling the geocoding API:', err);
        reject(err);
      }
    );
  });
}

updateMap(latitude: number, longitude: number) {
  this.mapOptions.center = { lat: latitude, lng: longitude };
  this.markerPosition = { lat: latitude, lng: longitude };
  this.changeDetectorRef.detectChanges();
}
showPointsModal: boolean = false;
displayNearbyPointsOfSale(userLocation: google.maps.LatLngLiteral) {
  this.dataService.getData().subscribe(dataPoints => {
    this.markers = dataPoints
      .filter(point => this.isWithinDistance(
        userLocation,
        { lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) },
        5 
      ))
      .map(point => {
        const distance = this.calculateDistance(
          userLocation.lat, userLocation.lng,
          parseFloat(point.latitude), parseFloat(point.longitude)
        );
        return {
          position: {
            lat: parseFloat(point.latitude),
            lng: parseFloat(point.longitude)
          },
          code_es: point.code_es,   
          agence: point.agence,     
          Adresse: point.Adresse,
          distance: distance.toFixed(2) 
        };
      })
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)); 
  });
}
isWithinDistance(point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral, maxDistanceKm: number): boolean {
  const earthRadiusKm = 6371;

  const dLat = this.degreesToRadians(point2.lat - point1.lat);
  const dLon = this.degreesToRadians(point2.lng - point1.lng);

  const lat1 = this.degreesToRadians(point1.lat);
  const lat2 = this.degreesToRadians(point2.lat);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = earthRadiusKm * c;

  return distance <= maxDistanceKm;
}
degreesToRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}
calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const earthRadiusKm = 6371;
  const dLat = this.degreesToRadians(lat2 - lat1);
  const dLon = this.degreesToRadians(lon2 - lon1);

  lat1 = this.degreesToRadians(lat1);
  lat2 = this.degreesToRadians(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return earthRadiusKm * c;
}
@Output() trackingDataEmitter = new EventEmitter<TrackingInfo[]>();
// trackPackage() {
//   this.apiService.trackPackage(this.trackingNumber).subscribe(
//     data => {
//       this.trackingData = data;
//       this.errorMessage = '';
//       console.log(this.trackingData)
//       },
//     error => {
//       console.error('Erreur lors de la récupération des données de suivi:', error);
//       this.errorMessage = 'Une erreur est survenue lors du suivi du colis.';
//       this.trackingData = [];
//     }
//   );
// }
trackPackage() {
  this.apiService.trackPackage(this.trackingNumber).subscribe(
    data => {
      this.trackingData = data;
      this.trackingDataEmitter.emit(this.trackingData); // Assurez-vous que c'est un TrackingInfo[]
      console.log(this.trackingData);
    },
    error => {
      console.error('Erreur lors de la récupération des données de suivi:', error);
      this.errorMessage = 'Une erreur est survenue lors du suivi du colis.';
      this.trackingData = [];    }
  );
}
}
