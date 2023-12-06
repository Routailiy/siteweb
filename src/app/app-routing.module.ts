import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ServiceLogistiqueComponent } from './layout/service-logistique-entreprise/service-logistique.component';
import { ServiceMessagerieComponent } from './layout/service-messagerie-entreprise/service-messagerie.component';
import { ServicesComponent } from './layout/services/services.component';
import { TimelineComponent } from './layout/timeline/timeline.component';
import { CarouselComponent } from './layout/carousel/carousel.component';
import { ServiceMessagerieEcomComponent } from './layout/service-messagerie-ecom/service-messagerie-ecom.component';
import { ServiceLogistiqueEcomComponent } from './layout/service-logistique-ecom/service-logistique-ecom.component';
import { ServiceMessagerieParticulierComponent } from './layout/service-messagerie-particulier/service-messagerie-particulier.component';
import { AboutComponent } from './layout/about/about.component';
import { CareersComponent } from './layout/careers/careers.component';

const routes: Routes = [
  { path: '', component: CarouselComponent },
  { path: 'logistique_details', component: ServiceLogistiqueComponent },
  { path: 'messagerie_details', component: ServiceMessagerieComponent },
  { path: 'messagerie_ecom_details', component: ServiceMessagerieEcomComponent },
  { path: 'logistique_ecom_details', component: ServiceLogistiqueEcomComponent },
  { path: 'messagerie_part_details', component: ServiceMessagerieParticulierComponent },
  { path : 'about' , component : AboutComponent},
  { path : 'careers', component : CareersComponent},

  { path : 'services' , component : ServicesComponent},
  { path : 'simulateur/:weight' , component : TimelineComponent},
  { path : 'simulateur' , component : TimelineComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
