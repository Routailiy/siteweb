import { Component, ViewChild, AfterViewInit, ElementRef, NgModule, ChangeDetectorRef, OnInit } from '@angular/core';
// import { CityService } from '../../services/city.service';
// import { CityModel } from 'src/app/Model/cityModel';
import { RelayPoint } from 'src/app/Model/RelayPointModel';
import { RelayPointService } from '../../services/relay-point.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as JsBarcode from 'jsbarcode';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { DataService } from './data-service';
import { Data } from './data.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiService } from './api_service';
import { CityService } from './city_service';
import { CityModel } from './city_model';
import jsPDF from 'jspdf';
import { marker } from 'leaflet';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/layout/carousel/auth.service';






interface MarkerLabel {
  color: string;
  fontSize: string;
  fontWeight: string;
  text: string;
}
interface LigneDonnees {
  destinataire_name: string;
  destinataire_phone: string;
  CIN: string;
  villeDestination: string;
  NumeroQuartier: string;
  quartierDestination: string;
  AdressDes: string;
  typeExpedition: string;
  typeLivraison: string;
  poids: number;
  showAmountInput: boolean;
  showAmountInput2: boolean,
  additionalAmount: number;
  AssuranceAmount: number;
  price?: number;
  barcodeImage?: string;
}


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



  export class AdressInputComponent implements OnInit {
    defaultLabel: MarkerLabel = {
      color: 'black',
      fontSize: '14px',
      fontWeight: 'bold',
      text: '' // Valeur par défaut
    };
    [x: string]: any;
    panier: any[] = [];
    form!: FormGroup;
    relayPoints: Data[] = [];
    zoom = 14;
    center!: google.maps.LatLngLiteral;
    selectedRelayPointSource: Data | null = null;
    selectedRelayPointSource2: Data | null = null;
    pointsOfSale: any[] = []; 
    markers: { position: google.maps.LatLngLiteral, options?: google.maps.MarkerOptions,  code_es: number, agence: string, Adresse: string,  distance?: string,  walkingTime?: string, drivingTime?: string,  label?: MarkerLabel}[] = [];
    latitude!: number ;
    data: Data[] = [];  
    longitude!: number ;
    Total!: number ;
    Deliveryttc!: number ;
    Smsttc!: number;
    typeExpedition = 'À domicile';
    typeSaisi!: string;
    typeLivraison!:string;
    poids!: number;
    adresse!: string;
    CIN!: string;
    expediteur_name!: string;
    expediteur_prenom!:string;
    adresseDetaillee!: string;
    expediteur_phone!:string;
    expediteur_email!: string;
    destinataire_name!: string;
    destinataire_prenom!: string;
    destinataire_phone!:string;
    destinataire_email!:string;
    quartier!: string;
    villeSource!:string;
    villeDestination!: string;
    quartiersDestination: CityModel[]=[];
    quartierDestination!: string;
    NumeroQuartier!: string;
   AdressDes!: string;
    quartiersSource: CityModel[]=[];
    quartierSource : string="";
    villes: string[] = [];
    adressSource :string="";
    adressDestination :string="";
    selectedRelayPointdestination!:RelayPoint;
    price!: number;
    uid!: string;
    formulaire!:FormGroup;
    date!: Date;
    yrs!: string;
    paiement_type!: string;
    lotlot:any;
    cities: string[] = [];
    selectedCity: string = '';
    additionalAmount !:number;
    AssuranceAmount !:number;
    userLocationIconUrl = 'assets/maps.svg';
    
    code!: string; // Define the code variable
    barcode!: string; // Define the code variable
    @ViewChild('barcode') barcodeElement: ElementRef | undefined;
    barcodeImage: string = '';
    barcodeImage2: string = '';

    private apiUrl = 'http://127.0.0.1:5000/etapes/';
    @ViewChild('dayOfTheYear') dayOfTheYear!: ElementRef;
    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
    

    mapOptions: google.maps.MapOptions = {
      center: { lat: 33.5731, lng: -7.5898 },
      zoom: 6 
    };
    markerPosition!: google.maps.LatLngLiteral;
    markerOptions: google.maps.MarkerOptions = { draggable: false }; // Customize as needed
    monFormulaire!: FormGroup;
    mapUrl!: string;

  additionalMarkerData: any[] = []; // Un tableau pour stocker des données supplémentaires
    constructor(private route: ActivatedRoute,private cityService: CityService,private relayPointService: RelayPointService, private http: HttpClient,private dataService: DataService,private changeDetectorRef: ChangeDetectorRef,private apiService: ApiService,private cdr: ChangeDetectorRef,private authService: AuthService) {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 1); // Ajustement pour GMT+1
      const isoString = currentDate.toISOString().substring(0, 16);

      this.form = new FormGroup({
        datetime: new FormControl(isoString),
        deliveryDate: new FormControl({ value: '', disabled: true })
      });

      this.onDateTimeChange(isoString);
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.poids=params['weight'];
      });
      this.dataService.getData().subscribe(data => {
        this.pointsOfSale = data;
      });
      const storedName = localStorage.getItem('name'); 
      if (storedName) {
        this.expediteur_name = storedName;
      } else {
        this.authService.getUserName().subscribe(name => {
          this.expediteur_name = name;
        });
      }
      const storedName2 = localStorage.getItem('uid'); 
      if (storedName2) {
        this.uid = storedName2;
      } else {
        this.authService.getUid().subscribe(uid => {
          this.uid = uid;
        });
      }
      console.log('Nom d\'utilisateur récupéré222222222:', this.expediteur_name);
      console.log('UID récupéré222222222:', this.uid);

      this.dataService.getData().subscribe(data => {
        this.data = data;
      });
      this.cityService.getCities().subscribe((data: CityModel[]) => {
        this.villes = data.map(item => item.Localisation)
                          .filter((localisation): localisation is string => localisation !== undefined)
                          .sort();
    });
    this.getCurrentLocation();

    }   
    selectedMarker: any = null;

    openInfoWindow(infoWindow: MapInfoWindow, markerRef: MapMarker, markerData: any) {
      this.selectedMarker = markerData;
      infoWindow.open(markerRef);
    }
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.updateMap(position.coords.latitude, position.coords.longitude);
            this.displayNearbyPointsOfSale({ lat: position.coords.latitude, lng: position.coords.longitude });
          },
          (error) => {
            console.error(`Erreur de géolocalisation: ${error.message}`);
          }
        );
      } else {
        console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
      }
    }
    generateCode(): string {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
    private existingBarcodes = new Set<string>();
    generateUniqueBarcode(): string {
      let uniqueBarcode;
      do {
        uniqueBarcode = this.generateCode2();
      } while (this.existingBarcodes.has(uniqueBarcode));
          this.existingBarcodes.add(uniqueBarcode);
      return uniqueBarcode;
    }
    generateCode2(): string {
      const timestamp = new Date().getTime();
      const randomNumber = Math.floor(100000000 + Math.random() * 900000000); 
      const randomLetters = Array.from({ length: 4 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('');
    
      let potentialCode = `${randomNumber}${randomLetters}`;
      while (this.isCodeExists(potentialCode)) {
        potentialCode = `${new Date().getTime()}${Math.floor(100000000 + Math.random() * 900000000)}${Array.from({ length: 4 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('')}`;
      }
    
      return potentialCode;
    }
    
    isCodeExists(code: string): boolean {
      return this.panier.some(item => item.barcode === code);
    }
    
  
    ajouterAuPanier() {
      if (this.lignes.length === 0 || !this.lignes.some(ligne => this.isValidData(ligne))) {
        const donnees = this.prepareDataForApi2();
        donnees.barcode = this.generateUniqueBarcode(); 
        this.generateBarcode2(donnees.barcode); 
        donnees.barcodeImage = this.barcodeImage2;
        this.panier.push(donnees);
      }
      this.lignes.forEach(ligne => {
        if (this.isValidData(ligne)) {
          const donneesPanier = this.prepareDataForApi(ligne);
          donneesPanier.barcode = this.generateUniqueBarcode();
          this.generateBarcode2(donneesPanier.barcode); 
          donneesPanier.barcodeImage = this.barcodeImage2; 
          this.panier.push(donneesPanier);
        }
      });
    
      this.lignes = [];
      console.log('Panier après ajout:', this.panier);
    }
    
    // envoyerDonneesDuPanier() {
    //   this.panier.forEach(item => {
    //     this.apiService.createData(item).subscribe({
    //       next: (response) => {
    //         console.log('Données envoyées avec succès:', response);
    //       },
    //       error: (error) => {
    //         console.error('Erreur lors de l\'envoi des données:', error);
    //       }
    //     });
    //   });    
    //   this.panier = [];
    // }
    
    
    Paniertocodebarre(){
      this.ajouterAuPanier();
      this.reinitialiserFormulaire();

    }
    @ViewChild('fileInput') fileInput!: ElementRef;

  public lignes: LigneDonnees[] = [];

onFileChange(evt: any) {
  const target: DataTransfer = <DataTransfer>(evt.target);
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  const reader: FileReader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    const bstr = e.target?.result;
    if (typeof bstr !== 'string') {
      throw new Error('Expected a string from FileReader');
    }
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

    if (data && data.length > 1) {
      this.lignes = data.slice(1).reduce((acc, row) => {
        if (row && row.length > 0 && row[0] && row[3]) {
          const poidsLigne = parseFloat(row[9]); 
          const prixLigne = this.showPrice2(poidsLigne); 
          const ligne: LigneDonnees = {
            destinataire_name: row[0],
            destinataire_phone: row[1],
            CIN: row[2],
            villeDestination: row[3],
            NumeroQuartier: row[4],
            quartierDestination: row[5],
            AdressDes: row[6],
            typeExpedition: row[7],
            typeLivraison: row[8],
            poids: poidsLigne,
            price: prixLigne, // Stockez le prix calculé dans la ligne
            showAmountInput: (row[10] === 'Espèces' || row[10] === 'Chèque'),
            additionalAmount: row[10] === 'Aucun' ? 0 : row[11],
            showAmountInput2: row[12] !== null && row[12] !== undefined && row[12] !== '',
            AssuranceAmount: row[12] ? row[12] : 0, 
          };
          acc.push(ligne);
        }
        return acc;
      }, []);
      this.ajouterAuPanier();
    } else {
      console.error('Format de données incorrect');
    }
  };

  reader.readAsBinaryString(target.files[0]);
}



    importFile() {
      const files = this.fileInput.nativeElement.files;
      if (files && files.length >= 1) {
        this.onFileChange({ target: { files: files } });
      }
      this.generateNewCode2();
    }
    
    reinitialiserFormulaire() {
      this.adressSource = '';
      this.villeDestination = '';
      this.quartierDestination = '';
      this.destinataire_name = '';
      this.destinataire_prenom = '';
      this.destinataire_email = '';
      this.showAmountInput= false;
      this.showAmountInput2= false;
      this.poids = 0;
      this.additionalAmount = 0;
      this.AssuranceAmount = 0;
      this.selectedRelayPointSource2 = null;
      this.destinataire_phone = '';
      this.Total = this.calculateTotal();
      this.formulaire.reset();
    }
    
  
  
    generateNewCode() {
      this.code = this.generateCode();
      this.generateBarcode(this.code);

    }
    generateNewCode2() {
      this.barcode = this.generateUniqueBarcode(); 
      this.generateBarcode2(this.barcode);
    }
    
    generateBarcode(code: string) {
      let canvas = document.createElement('canvas');
      JsBarcode(canvas, code, { format: 'CODE128' });
      this.barcodeImage = canvas.toDataURL("image/png");
    }
  
    generateBarcode2(barcode: string) {
      let canvas = document.createElement('canvas');
      JsBarcode(canvas, barcode, { format: 'CODE128' });
      this.barcodeImage2 = canvas.toDataURL("image/png");
    }
    
    downloadBarcodeAsPDF() {
      let canvas = document.createElement('canvas');
      JsBarcode(canvas, this.code, { format: 'CODE128' });
      const pdf = new jsPDF();
      const barcodeData = canvas.toDataURL("image/png");
      const width = 60; 
      const height = 30; 
      pdf.addImage(barcodeData, 'PNG', 10, 10, width, height);
      pdf.save('code-envoi.pdf');
        const dataForApi = {
        date_traitement: new Date().toISOString(), // Exemple de date de traitement
        type_expedition: this.typeExpedition,
        ville_source: this.villeSource,
        price: this.price,
        quartier_source: this.adresseDetaillee,
        relay_name_exp: this.selectedRelayPointSource?.agence,
        relay_code_exp: this.selectedRelayPointSource?.code_es,
        relay_adress_exp: this.selectedRelayPointSource?.Adresse,
        relay_name_dest: this.selectedRelayPointSource2?.agence,
        relay_code_dest: this.selectedRelayPointSource2?.code_es,
        relay_adress_dest: this.selectedRelayPointSource2?.Adresse,
        ville_destination: this.villeDestination,
        quartier_destination:this.NumeroQuartier + this.quartierDestination + this.adressDestination,
        poids: this.poids,
        contre_remboursement: this.additionalAmount,
        assurance: this.AssuranceAmount,
        exp_name: this.expediteur_name,
        exp_prenom: this.expediteur_prenom,
        exp_phone: this.expediteur_phone,
        exp_email: this.expediteur_email,
        dest_name: this.destinataire_name,
        dest_prenom: this.destinataire_prenom,
        dest_phone: this.destinataire_phone,
        dest_email: this.destinataire_email,
        Total: this.calculateTotal(),
        barcode: this.code
      };

    }
    
    supprimerDuPanier(index: number) {
      this.panier.splice(index, 1); 
  }
  

    getGoogleMapsUrl(address: string) {
      this.geocodeAddress(address).subscribe(location => {
        if (location) {
          const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
          window.open(url, "_blank");
        } else {
          console.error('Impossible de géocoder l\'adresse');
        }
      });
    }
    
    geocodeAddress(address: string): Observable<any> {
      const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDUPndHBosBn7HuEdZ5dWmJptcrMKgkHXg`;
      return this.http.get<any>(geocodingApiUrl).pipe(
        map(response => {
          if (response.status === 'OK') {
            return response.results[0].geometry.location;
          }
          throw new Error('Geocoding failed: ' + response.status);
        }),
        catchError(err => {
          console.error('Error calling the geocoding API:', err);
          return of(null); 
        })
      );
    }
    

    onDateTimeChange(selectedDate: string) {
      const date = new Date(selectedDate);
      const hours = date.getHours();
      let deliveryDates = [];
      if (hours < 12) {
        deliveryDates.push(new Date(date)); 
      } else {
        let tempDate = new Date(date);
        tempDate.setDate(tempDate.getDate() + 1);
        deliveryDates.push(tempDate); 

        tempDate = new Date(date);
        tempDate.setDate(tempDate.getDate() + 2);
        deliveryDates.push(tempDate); 
      }
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const deliveryDatesFormatted = deliveryDates.map(d => d.toLocaleDateString('fr-FR', options)).join(' et ');
      this.form.get('deliveryDate')?.setValue(deliveryDatesFormatted);
    }
    calculateTotal(ligne?: LigneDonnees): number {
      let total = 0;
      if (ligne) {
        total = (ligne.price ? ligne.price : 0) +
                (ligne.additionalAmount ? ligne.additionalAmount : 0) * 0.8 / 100 +
                (ligne.AssuranceAmount ? ligne.AssuranceAmount : 0) * 0.5 / 100 ;
      } else {
        total = (this.price ? this.price : 0) +
                (this.additionalAmount ? this.additionalAmount : 0) * 0.8 / 100 +
                (this.AssuranceAmount ? this.AssuranceAmount : 0) * 0.5 / 100 +
                (this.Smsttc ? this.Smsttc : 0) +
                (this.Deliveryttc ? this.Deliveryttc : 0);
      }
      return parseFloat(total.toFixed(2));
    }
    
    
    getTotalPanier(): string {
      const total = this.panier.reduce((acc, item) => acc + (item.Total || item.Total2 || 0), 0);
      return total.toFixed(2);
    }
    
   prepareDataForApi2 (): any {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 1); 
      const isoString = currentDate.toISOString().substring(0, 19).replace('T', ' ');
      return {
        date_traitement: isoString, 
        type_expedition: this.typeExpedition,
        ville_source: this.villeSource,
        price : this.price,
        quartier_source: this.adresseDetaillee,
        relay_name_exp : this.selectedRelayPointSource?.agence,
        relay_code_exp : this.selectedRelayPointSource?.code_es,
        relay_adress_exp : this.selectedRelayPointSource?.Adresse,
        relay_name_dest: this.selectedRelayPointSource2?.agence,
        relay_code_dest: this.selectedRelayPointSource2?.code_es,
        relay_adress_dest: this.selectedRelayPointSource2?.Adresse,
        ville_destination: this.villeDestination,
        quartier_destination: this.NumeroQuartier + this.quartierDestination + this.adressDestination,
        poids: this.poids,
        additionalAmount: this.additionalAmount,
        AssuranceAmount: this.AssuranceAmount,
        exp_name: this.expediteur_name,
        exp_phone: this.expediteur_phone,
        exp_email: this.expediteur_email,
        dest_name: this.destinataire_name,
        dest_phone: this.destinataire_phone,
        dest_email: this.destinataire_email,
        prix : this.price,
        Total: this.calculateTotal(),
        code: this.code,
        barcode: this.barcode,
        uid: this.uid
      };
      
    }
    prepareDataForApi(donnees: any): any {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 1); 
      const isoString = currentDate.toISOString().substring(0, 19).replace('T', ' ');
      const additionalAmount = donnees.additionalAmount || this.additionalAmount || 0;
      const AssuranceAmount = donnees.AssuranceAmount || this.AssuranceAmount || 0;
      const prix = donnees.price || this.price || 0;
      const total = ((additionalAmount * 0.8 )/ 100) + ((AssuranceAmount * 0.5 )/ 100) + prix;

      return {
        date_traitement: isoString, 
        ville_source: donnees.villeSource || this.villeSource,
        ville_destination: donnees.villeDestination || this.villeDestination,
        poids: donnees.poids || this.poids,
        type_expedition: donnees.typeExpedition || this.typeExpedition,
        type_livraison: donnees.typeLivraison || this.typeLivraison,
        exp_name: donnees.exp_name || this.expediteur_name,
        exp_phone: donnees.exp_phone || this.expediteur_phone,
        exp_email: donnees.exp_email || this.expediteur_email,
        dest_name: donnees.destinataire_name || this.destinataire_name,
        dest_prenom: donnees.destinataire_prenom || this.destinataire_prenom,
        dest_phone: donnees.destinataire_phone || this.destinataire_phone,
        dest_email: donnees.destinataire_email || this.destinataire_email,
        prix : prix,
        CIN: donnees.CIN || this.CIN,
        NumeroQuartier: donnees.NumeroQuartier || this.NumeroQuartier,
        quartier_destination: donnees.quartierDestination || this.NumeroQuartier + this.quartierDestination + this.adressDestination,
        AdressDes: donnees.AdressDes || this.AdressDes,
        additionalAmount: additionalAmount,
        AssuranceAmount: AssuranceAmount,
        Total2: total || 0, 
        Total: this.calculateTotal() || 0,
        code: this.code || donnees.code,
        barcode: this.barcode || donnees.barcode,
        uid: this.uid || donnees.uid

      };
    }    

    isValidData(ligne: LigneDonnees): boolean {
      return Boolean(ligne.destinataire_name && ligne.villeDestination);
    }

    getTravelTime(origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral, travelMode: google.maps.TravelMode): Promise<any> {
      const directionsService = new google.maps.DirectionsService();    
      return directionsService.route({
        origin: origin,
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: travelMode,
      }).then((response: { routes: { legs: { duration: any; }[]; }[]; }) => {
        const duration = response.routes[0].legs[0].duration;
        return duration.text; 
      }).catch((error: any) => {
        console.error('Error with Directions API: ', error);
        return null;
      });
    }
    downloadExcel() {
      const link = document.createElement('a');
      link.href = 'assets/template.xlsx'; 
      link.download = 'template.xlsx';
      link.click();
      link.remove();
    }
     
    onSelectRelayPoint(selectedMarker: any): void {
      this.selectedRelayPointSource = selectedMarker;      
      this.markers = this.markers.filter(marker => marker !== selectedMarker);  
      this.markers.unshift(selectedMarker);  
      this.getTravelTime({lat: this.latitude, lng: this.longitude}, selectedMarker.position, google.maps.TravelMode.WALKING)
        .then(walkingTime => {
          if (this.selectedRelayPointSource) {
            this.selectedRelayPointSource.walkingTime = walkingTime;
            this.changeDetectorRef.detectChanges();
          }
        })
        .catch(error => {
          console.error('Erreur lors du calcul du temps de trajet à pied', error);
        });
  
      this.getTravelTime({lat: this.latitude, lng: this.longitude}, selectedMarker.position, google.maps.TravelMode.DRIVING)
        .then(drivingTime => {
          if (this.selectedRelayPointSource) {
            this.selectedRelayPointSource.drivingTime = drivingTime;
            this.changeDetectorRef.detectChanges();
          }
        })
        .catch(error => {
          console.error('Erreur lors du calcul du temps de trajet en voiture', error);
        });
    }
    onSelectRelayPoint2(marker2: any): void {
      this.selectedRelayPointSource2 = marker2;
      this.markers = this.markers.filter(marker => marker !== marker2);
        this.markers.unshift(marker2);
      }
    onAddressChange() {
      if (this.villeSource && this.adresseDetaillee) {
        const address = `${this.villeSource}, ${this.adresseDetaillee}`;
        this.geocodeByStreet(this.adresseDetaillee, this.villeSource);
      }
    }
    
    geocodeByStreet(quartier:any,ville:any) {
      const address = `${ville}, ${quartier}`;
      const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDUPndHBosBn7HuEdZ5dWmJptcrMKgkHXg`;
      this.http.get<any>(geocodingApiUrl).subscribe(data => {
        if (data.status === 'OK') {
          const location = data.results[0].geometry.location;
          this.updateMap(location.lat, location.lng);
          this.markerPosition = { lat: location.lat, lng: location.lng };
          this.markerOptions = {
            icon: {
              url: this.userLocationIconUrl,
              scaledSize: new google.maps.Size(30, 30)
            }
          };
          this.displayNearbyPointsOfSale(location); 
        } else {
          console.error('Geocoding failed:', data.status);
        }
      }, err => {
        console.error('Error calling the geocoding API:', err);
      });
    }
    
    updateMap(latitude: number, longitude: number) {
      this.updateMapOptions(latitude, longitude);
      this.mapOptions.center = { lat: latitude, lng: longitude };
      this.markerPosition = { lat: latitude, lng: longitude };
      this.markerOptions = {
        icon: {
          url: this.userLocationIconUrl,
          scaledSize: new google.maps.Size(30, 30)
        }
      };
      this.changeDetectorRef.detectChanges();
    }
    updateMapOptions(latitude: number, longitude: number) {
      this.mapOptions = {
        ...this.mapOptions,
        center: { lat: latitude, lng: longitude }
      };
    }
    
    displayNearbyPointsOfSale(userLocation: google.maps.LatLngLiteral) {
      this.dataService.getData().subscribe(dataPoints => {
        let filteredPoints = dataPoints
          .filter(point => this.isWithinDistance(
            userLocation,
            { lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) },
            5 
          ))
          .map(point => ({
            position: {
              lat: parseFloat(point.latitude),
              lng: parseFloat(point.longitude)
            },
            code_es: point.code_es,   
            agence: point.agence,     
            Adresse: point.Adresse,
            distance: this.calculateDistance(
              userLocation.lat, userLocation.lng,
              parseFloat(point.latitude), parseFloat(point.longitude)
            ).toFixed(2),
            walkingTime: '',
            drivingTime: '',
            label: {
              color: '#black',
              fontSize: '14px',
              fontWeight: 'bold',
              text: point.code_es.toString()
            }
          }))
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    
        Promise.all(filteredPoints.map(marker =>
          Promise.all([
            this.getTravelTime(userLocation, marker.position, google.maps.TravelMode.WALKING)
              .then(walkingTime => marker.walkingTime = walkingTime)
              .catch(() => marker.walkingTime = 'Indisponible'),
            this.getTravelTime(userLocation, marker.position, google.maps.TravelMode.DRIVING)
              .then(drivingTime => marker.drivingTime = drivingTime)
              .catch(() => marker.drivingTime = 'Indisponible')
          ])
        )).then(() => {
          this.markers = filteredPoints;
          this.changeDetectorRef.detectChanges();
        });
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
    findNearestRelayPoint(clickedLatLng: google.maps.LatLngLiteral, markers: Array<any>): any {
      let nearestRelayPoint = null;
      let minimumDistance = Number.MAX_VALUE;
    
      markers.forEach(marker => {
        const distance = this.getDistanceBetweenPoints(clickedLatLng, marker.position);
        if (distance < minimumDistance) {
          minimumDistance = distance;
          nearestRelayPoint = marker;
        }
      });
    
      return nearestRelayPoint;
    }
    getDistanceBetweenPoints(point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral): number {
      const R = 6371;
      const dLat = this.degreesToRadians(point2.lat - point1.lat);
      const dLon = this.degreesToRadians(point2.lng - point1.lng);
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.degreesToRadians(point1.lat)) * Math.cos(this.degreesToRadians(point2.lat)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      return R * c; 
    }
    showBarcode: boolean = false; 
    toggleBarcodeVisibility() {
      this.showBarcode = !this.showBarcode;
        if (this.showBarcode && !this.barcodeImage) {
        this.generateNewCode();
      }
    } 

    showFirstButton: boolean = true;

    toggleVisibility() {
          this.showFirstButton = !this.showFirstButton;
          this.generateNewCode();
           this.ajouterAuPanier();
        
          
        
      console.log("testbarcodeeeeeeeeeeee")
    }  
    validateAmount(amount: string): boolean {
      return /^\d+(\.50|\.55)?$/.test(amount);
    }
    
    getLocation() {
      console.log(this.expediteur_name)
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
      const apiKey = 'AIzaSyDUPndHBosBn7HuEdZ5dWmJptcrMKgkHXg';
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${apiKey}`;

      this.http.get(apiUrl)
        .toPromise()
        .then((data: any) => {
          if (data && data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const neighborhoodComponent = addressComponents.find((component: { types: string[]; }) =>
              component.types.includes('neighborhood') || component.types.includes('sublocality')
            );

            if (neighborhoodComponent) {
              this.quartier = neighborhoodComponent.long_name;
            } else {
              console.error('Le quartier n\'a pas pu être déterminé à partir des coordonnées.');
            }
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
    
    ngAfterViewInit(): void{
      // Create your form group here
      this.formulaire = new FormGroup({
        typeExpedition: new FormControl(''),
        typeLivraison: new FormControl(''),
        poids: new FormControl(''),
        villeSource: new FormControl(''),
        quartierSource: new FormControl(''),
        villeDestination: new FormControl(''),
        quartierDestination: new FormControl('')
        
      });
      this.formulaire.valueChanges.subscribe(value => {
        console.log(value); // Do something with the updated form values
      });
      setTimeout(() => {
      }, 0);
      this.cdr.detectChanges();
      this.generateNewCode();

    }


    // onVilleSourceChange() {
    //   this.quartiersSource=[];
    //   this.cityService.getAlldistrictByCity(this.villeSource).subscribe(
    //     (results : CityModel[])=>{
    //       this.quartiersSource=results;
    //     })
    
    // }
    onQuartierSourceChange(){
      console.log(this.quartierSource)
      this.adressSource="";
      this.adressSource=this.villeSource+ this.quartierSource;
    }
    choseRelayPointDestination(relayPoint:RelayPoint){
      this.selectedRelayPointdestination=relayPoint;
      
    }
    onSubmit(formulaire: NgForm) {
      if (this.typeSaisi=='Saisie manuel') {
        if (formulaire.valid) {
          this.toggleRows();
          }
      }else{
        console.log('passssssssssssssss')
      }
      
    }
showPrice2(poids: number): number {
  const tarifs = [
    { poidsMax: 1.5, prix: 45 },
    { poidsMax: 10, prix: 50 },
    { poidsMax: Infinity, prix: 74 }
  ];
  const tarifApplicable = tarifs.find(tarif => poids <= tarif.poidsMax);
  return tarifApplicable ? tarifApplicable.prix : 0;
}
showPrice() {
  const tarifs = [
    { poidsMax: 1.5, prix: 45 },
    { poidsMax: 10, prix: 50 },
    { poidsMax: Infinity, prix: 74 }
  ];
  const tarifApplicable = tarifs.find(tarif => this.poids <= tarif.poidsMax);
  this.price = tarifApplicable ? tarifApplicable.prix : 0;
}

    
    showFirstRow: boolean = true;
    toggleRows() {
      this.showFirstRow = !this.showFirstRow;
    }
    showAmountInput: boolean = false;
    BackRows() {
      this.showFirstRow == true;
    }

    toggleAmountInput() {
      this.showAmountInput = !this.showAmountInput;
      if (!this.showAmountInput) {
        this.additionalAmount = 0;
      }
    }
    showAmountInput2: boolean = false;

    toggleAmountInpu2t() {
      this.showAmountInput2 = !this.showAmountInput2;
      if (!this.showAmountInput2) {
        this.AssuranceAmount = 0;
      }
    }
    showAmountInput3: boolean = false;
    toggleAmountInput3() {
      this.showAmountInput3 = !this.showAmountInput3;
      if (!this.showAmountInput3) {
        this.Smsttc = 0;
      }else{
        this.Smsttc = 1.7;
      }
    }
    showAmountInput4: boolean = false;
    toggleAmountInput4() {
      this.showAmountInput4 = !this.showAmountInput4;
      if (!this.showAmountInput4) {
        this.Deliveryttc = 0;
      }else{
        this.Deliveryttc = 10;
      }
    }
    downloadAsPDF() {
        // this.envoyerDonneesDuPanier();
      this.showFirstButton = !this.showFirstButton;
      this.showFirstRow = !this.showFirstRow;

      const pdf = new jsPDF();
    
      this.panier.forEach((item, index) => {
        if (index > 0) {
          pdf.addPage();
        }    
        pdf.setFont("helvetica");
        pdf.setFontSize(12);    
        let y = 10;    
        pdf.setDrawColor(0);
        pdf.setFillColor(255, 255, 255);
        pdf.rect(10, y, 190, 120, 'F');  
        y += 20;     
        pdf.setFontSize(16);
        pdf.setFont('bold');
        pdf.text(`Nom: ${item.dest_name}`, 20, y);    
        pdf.setFontSize(12);
        pdf.setFont('normal');
        pdf.text(`Quartier : ${item.quartier_destination}`, 20, y+ 10);    
        pdf.text(`Type d'expédition: ${item.type_expedition}`, 20, y + 10);
        pdf.text(`Poids: ${item.poids} kg`, 20, y + 20);
        pdf.text(`Prix: ${item.prix || 0} MAD`, 20, y + 30);
        pdf.text(`Total: ${(item.Total || item.Total2).toFixed(2)} MAD`, 20, y + 40);    
        if (item.barcodeImage) {
          pdf.addImage(item.barcodeImage, 'PNG', 20, y + 50, 50, 20);
        }
      });
    
      pdf.save('panier.pdf');
    }
    
  }

