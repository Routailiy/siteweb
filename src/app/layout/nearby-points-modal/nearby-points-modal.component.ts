import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-nearby-points-modal',
  templateUrl: './nearby-points-modal.component.html',
  styleUrls: ['./nearby-points-modal.component.css']
})
export class NearbyPointsModalComponent implements OnChanges {
  @Input() showModal: boolean = false;
  @Input() markers: { position: google.maps.LatLngLiteral, options?: google.maps.MarkerOptions, code_es: number, agence: string, Adresse: string, distance?: string }[] = [];

  close() {
    this.showModal = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal']) {
      console.log("showModal changed", changes['showModal'].currentValue);
    }
  }
}
