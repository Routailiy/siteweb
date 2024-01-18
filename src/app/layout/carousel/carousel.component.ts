import { Component, Input } from '@angular/core';
import { TrackingInfo } from '../tracking/tracking.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  constructor(private authService: AuthService, private router: Router) {}

adress!:string;
@Input() trackingData: TrackingInfo[] = [];
onTrackingDataReceived(trackingData: TrackingInfo[]) {
  this.trackingData = trackingData;
}
addAdress(event:string){
   this.adress=event;
  }
  loginError: string = '';
  
  login(email: string, password: string) {
    this.loginError = '';
    if (!email || !password) {
      this.loginError = 'Username or password is incorrect';
      return;
    }

    this.authService.login({ username: email, password: password }).subscribe(
      success => {
        this.router.navigate(['/simulateur']);
      },
      error => {
        this.loginError = 'Invalid credentials';
        console.error(error);
      }
    );
}

}
