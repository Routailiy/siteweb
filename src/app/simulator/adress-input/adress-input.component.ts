import { Component, ViewChild, AfterViewInit, ElementRef, NgModule, ChangeDetectorRef } from '@angular/core';
import { CityService } from '../../services/city.service';
import { CityModel } from 'src/app/Model/cityModel';
import { RelayPoint } from 'src/app/Model/RelayPointModel';
import { RelayPointService } from '../../services/relay-point.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as JsBarcode from 'jsbarcode';
import { GoogleMap } from '@angular/google-maps';
import { DataService } from './data-service';
import { Data } from './data.model';







declare var google: any;

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

@Component({
  selector: 'app-adress-input',
  templateUrl: './adress-input.component.html',
  styleUrls: ['./adress-input.component.css'],
  
})



export class AdressInputComponent  {
  relayPoints: Data[] = []; // Utiliser le type Data
  zoom = 14;
  center!: google.maps.LatLngLiteral;
  selectedRelayPointSource: Data | null = null;
  selectedRelayPointSource2: Data | null = null;
  pointsOfSale: any[] = []; // Votre tableau de points de vente
  markers: { position: google.maps.LatLngLiteral, options?: google.maps.MarkerOptions,  code_es: number, agence: string, Adresse: string,  distance?: string }[] = [];
  latitude!: number ;
  data: Data[] = [];  
  longitude!: number ;  
  typeExpedition!: string;
  poids!: number;
  adresse!: string;
  expediteur_name!: string;
  expediteur_prenom!:string;
  adresseDetaillee!: string;
  expediteur_phone!:number;
  expediteur_email!: string;
  destinataire_name!: string;
  destinataire_prenom!: string;
  destinataire_phone!:number;
  destinataire_email!:string;
  quartier!: string;
  villeSource!:string;
  villeDestination!: string;
  quartiersDestination: CityModel[]=[];
  quartierDestination!: string;
  quartiersSource: CityModel[]=[];
  quartierSource : string="";
  villes: string[] = [];
  adressSource :string="";
  adressDestination :string="";
  selectedRelayPointdestination!:RelayPoint;
  price!: number;
  formulaire!:FormGroup;
  date!: Date;
  yrs!: string;
  lotlot:any;
  cities: string[] = [];
  selectedCity: string = '';
  additionalAmount !:number;
  AssuranceAmount !:number;
  @ViewChild('dayOfTheYear') dayOfTheYear!: ElementRef;
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild('barcode') barcodeElement!: ElementRef;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 33.5731, lng: -7.5898 },
    zoom: 6 
  };
  markerPosition!: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = { draggable: false }; // Customize as needed
  monFormulaire!: FormGroup;

  mapUrl!: string;
  constructor(private route: ActivatedRoute,private cityService: CityService,private relayPointService: RelayPointService, private http: HttpClient,private dataService: DataService,private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
     this.poids=params['weight'];
      // Use the value of `id` as needed in your component
    });
    this.dataService.getData().subscribe(data => {
      this.pointsOfSale = data;
    });
  

    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }
  generateBarcode(): void {
    const randomNumber = this.generateRandomNumber();
    JsBarcode(this.barcodeElement.nativeElement, randomNumber, {
      format: "CODE128",
      lineColor: "#000",
      width: 2,
      height: 40,
      displayValue: true
    });
  }
  

  generateRandomNumber(): string {
    let randomNumber = '';
    for (let i = 0; i < 10; i++) {
      randomNumber += Math.floor(Math.random() * 10).toString();
    }
    return randomNumber;
  }
  getTravelTime(origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral, travelMode: google.maps.TravelMode): Promise<any> {
    const directionsService = new google.maps.DirectionsService();
  
    return directionsService.route({
      origin: origin,
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: travelMode,
    }).then((response: { routes: { legs: { duration: any; }[]; }[]; }) => {
      const duration = response.routes[0].legs[0].duration;
      return duration.text; // Ou toute autre information dont vous avez besoin
    }).catch((error: any) => {
      console.error('Error with Directions API: ', error);
      return null;
    });
  }
  
  

  onSelectRelayPoint(marker: any): void {
    this.selectedRelayPointSource = marker;
  
    // Calculer le temps de trajet à pied
    this.getTravelTime({lat: this.latitude, lng: this.longitude}, marker.position, google.maps.TravelMode.WALKING)
      .then(walkingTime => {
        if (this.selectedRelayPointSource) {
          this.selectedRelayPointSource.walkingTime = walkingTime;
        }
      });
  
    // Calculer le temps de trajet en voiture
    this.getTravelTime({lat: this.latitude, lng: this.longitude}, marker.position, google.maps.TravelMode.DRIVING)
      .then(drivingTime => {
        if (this.selectedRelayPointSource) {
          this.selectedRelayPointSource.drivingTime = drivingTime;
        }
      });
  }
  
  onSelectRelayPoint2(marker2: any): void {
    this.selectedRelayPointSource2 = marker2;
    
  }
  geocodeByStreet(quartier:any,ville:any) {
    const address = `${ville}, ${quartier}`;
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBqimHieAKQubjYTPyEiVhMx56kLMMQbeE`;
    this.http.get<any>(geocodingApiUrl).subscribe(data => {
      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        this.updateMap(location.lat, location.lng);
        this.displayNearbyPointsOfSale(location); 
      } else {
        console.error('Geocoding failed:', data.status);
      }
    }, err => {
      console.error('Error calling the geocoding API:', err);
    });
  }
    

  
  updateMap(latitude: number, longitude: number) {
    this.mapOptions.center = { lat: latitude, lng: longitude };
    this.markerPosition = { lat: latitude, lng: longitude };
    this.changeDetectorRef.detectChanges();
  }
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
  
  showFirstButton: boolean = true;

  toggleVisibility(formulaire: NgForm) {
      if (formulaire.valid) {
        this.showFirstButton = !this.showFirstButton;
        this.generateBarcode()

      }
    console.log("testbarcodeeeeeeeeeeee")
  }  
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);

          // Appeler la fonction de géocodage directement
          this.getCityFromCoordinates();
        },
        (error) => {
          console.error(`Erreur de géolocalisation: ${error.message}`);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par votre navigateur.');
    }
  }

  getCityFromCoordinates() {
    const apiKey = 'AIzaSyAqlub2XWpn7MwqlN-gT1rAmyClo3YOJS4';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${apiKey}`;

    this.http.get(apiUrl)
      .toPromise()
      .then((data: any) => {
        if (data && data.results && data.results.length > 0) {
          const addressComponents = data.results[0].address_components;

          // Extraire le quartier à partir des résultats de géocodage
          const neighborhoodComponent = addressComponents.find((component: { types: string[]; }) =>
            component.types.includes('neighborhood') || component.types.includes('sublocality')
          );

          if (neighborhoodComponent) {
            this.quartier = neighborhoodComponent.long_name;
          } else {
            console.error('Le quartier n\'a pas pu être déterminé à partir des coordonnées.');
          }

          // Extraire la ville à partir des résultats de géocodage
          const cityComponent = addressComponents.find((component: { types: string | string[]; }) =>
            component.types.includes('locality')
          );

          if (cityComponent) {
            this.villeSource = cityComponent.long_name;
          } else {
            console.error('La ville n\'a pas pu être déterminée à partir des coordonnées.');
          }

          this.adresseDetaillee = data.results[0].formatted_address;
        } else {
          console.error('Aucun résultat de géocodage disponible.');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de l\'appel de l\'API de géocodage:', error);
      });
  }
  
  ngAfterViewInit() {
    // Create your form group here
    this.formulaire = new FormGroup({
      typeExpedition: new FormControl(''),
      poids: new FormControl(''),
      villeSource: new FormControl(''),
      quartierSource: new FormControl(''),
      villeDestination: new FormControl(''),
      quartierDestination: new FormControl('')
      
    });
    this.formulaire.valueChanges.subscribe(value => {
      console.log(value); // Do something with the updated form values
    });
    this.generateBarcode();

  }



   onVilleSourceChange() {
    this.quartiersSource=[];
    this.cityService.getAlldistrictByCity(this.villeSource).subscribe(
      (results : CityModel[])=>{
        this.quartiersSource=results;
      })
   
  }
  onQuartierSourceChange(){
    console.log(this.quartierSource)
    this.adressSource="";
    this.adressSource=this.villeSource+ this.quartierSource;
  }
  choseRelayPointDestination(relayPoint:RelayPoint){
    this.selectedRelayPointdestination=relayPoint;
    
  }
  onSubmit(formulaire: NgForm) {
    if (formulaire.valid) {
     this.toggleRows();
    }
  }
  
  
  showPrice(){
    console.log("cxvv")
    if (this.poids && this.typeExpedition ){
      switch (true) {
        case this.poids < 1.5 && this.typeExpedition === 'À domicile':
          this.price = 45;
          break;
        case this.poids < 1.5 && this.typeExpedition === 'Point de relais':
          this.price = 50;
          break;
        case this.poids >= 1.5 && this.poids <= 10 && this.typeExpedition === 'À domicile':
          this.price = 50;
          break;
        case this.poids >= 1.5 && this.poids <= 10 && this.typeExpedition === 'Point de relais':
          this.price = 56;
          break;
        case this.poids > 10 && this.typeExpedition === 'À domicile':
          this.price = 74;
          break;
        case this.poids > 10 && this.typeExpedition === 'Point de relais':
          this.price = 83;
          break;
        default:
          this.price = 0;
      }
    } else {
      this.price = 0;
    }
  }
  showFirstRow: boolean = true;
  toggleRows() {
    this.showFirstRow = !this.showFirstRow;
  }
  showAmountInput: boolean = false;

  toggleAmountInput() {
    this.showAmountInput = !this.showAmountInput;
  }
  showAmountInput2: boolean = false;

  toggleAmountInpu2t() {
    this.showAmountInput2 = !this.showAmountInput2;
  }
  showAmountInput3: boolean = false;
  toggleAmountInput3() {
    this.showAmountInput3 = !this.showAmountInput3;
  }
  showAmountInput4: boolean = false;
  toggleAmountInput4() {
    this.showAmountInput4 = !this.showAmountInput4;
  }
}

