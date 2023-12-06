import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
@Output() adressEmitter = new EventEmitter<string>();
weight!:number;
adress!:string;
selectedDestination!: string;
isSmallText: boolean = true; 
constructor(private router: Router) { }
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
addAdress(value: string) {
  
  this.adressEmitter.emit(value);
}
}
