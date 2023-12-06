import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-services',
  templateUrl: './shared-services.component.html',
  styleUrls: ['./shared-services.component.css']
})
export class SharedServicesComponent {
 @Input() service_details:string[]=[];
 @Input() service_img:string="";
 @Input() title:string="";
 @Input() order!:string;
 @Input() titles_color:string="";
 @Input() second:boolean=false;
 @Input() title_second:string="";
 @Input() service_details_second:string[]=[];
}
