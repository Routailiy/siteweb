import { Component } from '@angular/core';


@Component({
  selector: 'app-service-logistique',
  templateUrl: './service-logistique.component.html',
  styleUrls: ['./service-logistique.component.css']
})
export class ServiceLogistiqueComponent {
  service_details_1=[
    "Le service de l’affrètement de Sapress est la solution la plus économique et efficace pour le transport de vos marchandises au niveau de tout le territoir marocain.",
  "Sapress met à la disposition de ses clients une flotte de véhicules et utilitaires en mode location afin de répondre à vos besoins spécifiques en termes de transport de marchandise."
  ];
 title_1 ="Solution sur mesure pour vos besoins de transport de marchandises";
 service_img_1="/assets/services_images/logistique1.png";
 order_1="order-0";
 service_details_2=[
  "Un service sur-mesure pour le transport de marchandise",  "Couverture Nationale","Tarification adaptée et sur mesure"
  ,"Equipe experte et de confiance","Service de manutention assurée à la demande","Choix de type de transport : Groupage, lots partiels et lots complets",
  "Service de manutention assurée à la demande","Service sur mesure disponible 24H/24H et 7J/7J"
];
titles_color= "#104533";

title_2 ="Avantages";
service_img_2="/assets/services_images/logistique2.png";
order_2="order-0 order-lg-1 order-md-1";

}
