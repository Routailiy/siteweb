import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/layout/carousel/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
panier: any;
name!: string;
  constructor(private router: Router,private authService: AuthService) {
   }
   ngOnInit(): void {
    const storedName = localStorage.getItem('name'); 
    if (storedName) {
      this.name = storedName;
    } else {
      this.authService.getUserName().subscribe(name => {
        this.name = name;
      });
    }
    console.log('Nom d\'utilisateur récupéré222222222:', this.name);
  }   
  logout() {
    this.authService.logout();
  }
 
   
}

