import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
panier: any;
  constructor(private router: Router) {

   }
 
   
}

