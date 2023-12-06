import { Component } from '@angular/core';

@Component({
  selector: 'app-service-messagerie',
  templateUrl: './service-messagerie.component.html',
  styleUrls: ['./service-messagerie.component.css']
})
export class ServiceMessagerieComponent {
  service_details_1=[
    "Sapress vous propose une gestion maitrisée et efficiente de toute la chaîne logistique de votre activité de dématérialisation de la commercialisation de vos produits et services.",
  "Sapress prend en charge pas seulement la livraison de vos envois, mais aussi le stockage, la préparation de vos commandes, la gestion de retour de fonds et la livraison des documents retournées sous format physique ou électronique."
  ];
 title_1 ="Une livraison Last mile 2.0 pour vos envois";
 service_img_1="/assets/services_images/messagerie_ent_1.png";
 order_1="order-0";
 service_details_2=[
  "Couverture nationale jusqu’au dernier kilomètre",  "Offre sur mesure en fonction de l’activité","Un web service à disposition du client pour le suivi du stock, le reporting et le suivi des envois"
  ,"Un accès au tracking mis à disposition du destinataire du client","Retour instantané des documents électronique","Retour rapide des documents physiques et des POD",
  "Une tarification attrayante et sur mesure."
];
titles_color= "#f9ac31";

title_2 ="Avantages";
service_img_2="/assets/services_images/messagerie_ent_2.png";
order_2="order-0 order-lg-1 order-md-1";

}
