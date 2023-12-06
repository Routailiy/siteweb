import { Component } from '@angular/core';

@Component({
  selector: 'app-service-messagerie-ecom',
  templateUrl: './service-messagerie-ecom.component.html',
  styleUrls: ['./service-messagerie-ecom.component.css']
})
export class ServiceMessagerieEcomComponent {
  service_details_1=[
    "Sapress vous propose une gestion maitrisée et efficiente de toute la chaîne logistique de votre activité e-commerce.",
  "Sapress prend en charge pas seulement la livraison de vos colis, mais aussi le stockage, la préparation de vos commandes, la gestion de retour de fonds et une prise en charge des colis retournés."
  ];
 title_1 ="Des solutions logistiques digitales pour les e-commerçants";
 service_img_1="/assets/services_images/messagerie_ecom_1.png";
 order_1="order-0";
 service_details_second=[
  "Couverture nationale jusqu’au dernier kilomètre",  "Offre sur mesure en fonction de l’activité","Un web service à disposition du client pour le suivi du stock, le reporting et le suivi des envois"
  ,"Un accès au tracking mis à disposition du destinataire du client","Retour instantané des documents électronique","Retour rapide des documents physiques et des POD",
  "Une tarification attrayante et sur mesure."
];
titles_color= "#f9ac31";

title_second ="Avantages";
}
