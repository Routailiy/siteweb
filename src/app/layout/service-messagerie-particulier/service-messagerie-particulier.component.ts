import { Component } from '@angular/core';

@Component({
  selector: 'app-service-messagerie-particulier',
  templateUrl: './service-messagerie-particulier.component.html',
  styleUrls: ['./service-messagerie-particulier.component.css']
})
export class ServiceMessagerieParticulierComponent {
  service_details_1=[
    "Pour vos besoins d’envoi et livraison de colis, Sapress vous propose des services qui facilitent votre quotidien.",
  "Déposez vos colis dans le point relais le plus proche pour livrer vos destinataires à domicile ou en point relais de proximité selon avec une solution adaptée à vos contraintes temps et budget."
  ];
 title_1 ="Nos services à proximité de vous là où vous êtes";
 service_img_1="/assets/services_images/messagerie_part_1.png";
 order_1="order-0";
 service_details_2=[
  "Couverture nationale jusqu’au dernier kilomètre",  "Offre sur mesure en fonction de l’activité","Possibilité de préparer le colis en ligne"
  ,"Un accès au tracking mis à disposition du destinataire du client","Livraison en point relais de proximité ou à domicile",
  "Une tarification attrayante et sur mesure."
];
titles_color= "#f9ac31";

title_2 ="Avantages";
service_img_2="/assets/services_images/messagerie_part_2.png";
order_2="order-0 order-lg-1 order-md-1";

}
