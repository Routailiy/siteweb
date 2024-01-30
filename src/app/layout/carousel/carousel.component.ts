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
  adress!: string;
  @Input() trackingData: TrackingInfo[] = [];
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onTrackingDataReceived(trackingData: TrackingInfo[]) {
    this.trackingData = trackingData;
  }

  addAdress(event: string) {
    this.adress = event;
  }

  login(email: string, password: string) {
    this.loginError = '';
    if (!email || !password) {
      this.loginError = 'Username or password is incorrect';
      return;
    }

    this.authService.login({ username: email, password: password }).subscribe(
      success => {
        this.authService.setUserName(success.name);
        localStorage.setItem('name', success.name); // ou sessionStorage
        this.authService.setUserName(success.uid);
        localStorage.setItem('uid', success.uid); // ou sessionStorage
        this.router.navigate(['/simulateur']);
        console.log(success);
      },
      error => {
        this.loginError = 'Invalid credentials';
        console.error(error);
      }
    );
  }
}
