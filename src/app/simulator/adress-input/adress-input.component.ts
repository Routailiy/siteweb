import { Component, ViewChild, AfterViewInit, ElementRef, NgModule } from '@angular/core';
import { CityService } from '../../services/city.service';
import { CityModel } from 'src/app/Model/cityModel';
import { PopupMapComponent } from '../popup-map/popup-map.component';
import { RelayPoint } from 'src/app/Model/RelayPointModel';
import { RelayPointService } from '../../services/relay-point.service';
import { relayPointInfo } from '../../Model/relayPointInfo';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as JsBarcode from 'jsbarcode';
import { BarcodeGeneratorAllModule,QRCodeGeneratorAllModule,DataMatrixGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";





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
  latitude!: number ;
  longitude!: number ;  
  typeExpedition!: string;
  poids!: number;
  adresse!: string;
  adresseDetaillee!: string;
  quartier!: string;
  villeSource!:string;
  villeDestination!: string;
  quartiersDestination: CityModel[]=[];
  quartierDestination!: string;
  quartiersSource: CityModel[]=[];
  quartierSource : string="";
  villes: string[] = [];
  relayPoints: RelayPoint[]= [];
  adressSource :string="";
  adressDestination :string="";
  selectedRelayPointSource!:RelayPoint;
  selectedRelayPointdestination!:RelayPoint;
  price!: number;
  formulaire!:FormGroup;
  date!: Date;
  yrs!: string;
  lotlot:any;
  cities: string[] = [];
  selectedCity: string = '';
  additionalAmount !:number;
  @ViewChild('dayOfTheYear') dayOfTheYear!: ElementRef;
  constructor(private route: ActivatedRoute,private cityService: CityService,private relayPointService: RelayPointService, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
     this.poids=params['weight'];
      // Use the value of `id` as needed in your component
    });
    this.relayPointService.getRelayPoints().subscribe((results :RelayPoint[])=>{
      results.forEach( (relayPoint : RelayPoint) => {
        relayPoint.position =  {lat:relayPoint.latitude, lng: relayPoint.longitude };
        this.relayPoints.push(relayPoint);
      })
    });
    this.getVilles(); 

  }
  showFirstButton: boolean = true;

  toggleVisibility() {
    this.showFirstButton = !this.showFirstButton;
  }
  handleAddressChange(address: any) {
    // Extract the city from the address object
    const city = address.formatted_address;
  
    // Do something with the selected city (e.g., store it in a variable)
    this.villeDestination = city;
  
    // You can also log the full address details for debugging
    console.log(address);
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
    const apiKey = 'AIzaSyA2FrsBMv3-BFiBwAdr3wVR7FgI8YbICT8';
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

          // Extraire l'adresse détaillée
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

    // Subscribe to changes in the form group
    this.formulaire.valueChanges.subscribe(value => {
      console.log(value); // Do something with the updated form values
    });

  }
  getVilles(): void {
    // Remplacez cette URL par l'URL de l'API pour récupérer la liste des villes
     this.cityService.getAllCitiesName().subscribe( (results)=>{
       this.villes =results;
     }     
     );
    
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
   onVilleDestinationChange() {
    this.quartiersDestination=[];
    this.cityService.getAlldistrictByCity(this.villeDestination).subscribe(
      (results)=>{
        this.quartiersDestination=results;
      }
    )
  }
  onQuartierDestinationChange(){
    this.adressDestination="";
    this.adressDestination=this.villeDestination + " "+this.quartierDestination;
  }

 
  choseRelayPoint(relayPoint:RelayPoint){
    this.selectedRelayPointSource=relayPoint;
    
  }
  choseRelayPointDestination(relayPoint:RelayPoint){
    this.selectedRelayPointdestination=relayPoint;
    
  }
  onSubmit(formulaire: any): void {
    console.log('Formulaire soumis', formulaire.value);
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
}

