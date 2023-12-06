import { AfterViewInit, Component, Input } from '@angular/core';
import { RelayPoint } from '../../Model/RelayPointModel';

@Component({
  selector: 'app-relay-point-info',
  templateUrl: './relay-point-info.component.html',
  styleUrls: ['./relay-point-info.component.css']
})
export class RelayPointInfoComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  @Input() relayPoint!: RelayPoint;
}
