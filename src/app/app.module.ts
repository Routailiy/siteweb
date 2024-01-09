import { NgModule , CUSTOM_ELEMENTS_SCHEMA, AfterViewInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeroComponent } from './layout/hero/hero.component';
import { AboutComponent } from './layout/about/about.component';
import { NewsComponent } from './layout/news/news.component';
import { AdressInputComponent } from './simulator/adress-input/adress-input.component';
import { RelayPointMapComponent } from './simulator/relay-point-map/relay-point-map.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupMapComponent } from './simulator/popup-map/popup-map.component';
import { RelayPointInfoComponent } from './layout/relay-point-info/relay-point-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './layout/footer/footer.component';
import { ServicesComponent } from './layout/services/services.component';
import { ReferencesComponent } from './layout/references/references.component';
import { CounterComponent } from './layout/counter/counter.component';
import { FeaturedServicesComponent } from './layout/featured-services/featured-services.component';
import { CtaComponent } from './layout/cta/cta.component';
import { ServiceMessagerieComponent } from './layout/service-messagerie-entreprise/service-messagerie.component';
import { ServiceLogistiqueComponent } from './layout/service-logistique-entreprise/service-logistique.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceLogistiqueEcomComponent } from './layout/service-logistique-ecom/service-logistique-ecom.component';
import { ServiceMessagerieEcomComponent } from './layout/service-messagerie-ecom/service-messagerie-ecom.component';
import { CarouselComponent } from './layout/carousel/carousel.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TimelineComponent } from './layout/timeline/timeline.component';
import { CardComponent } from './layout/card/card.component';
import { OffreMessagerieComponent } from './layout/offre-messagerie/offre-messagerie.component';
import { OffreLogistiqueComponent } from './layout/offre-logistique/offre-logistique.component';
import { OffreMessagerieCustomizedComponent } from './layout/offre-messagerie-customized/offre-messagerie-customized.component';
import { ClientTypeComponent } from './layout/client-type/client-type.component';
import { LogisticClientsTypeComponent } from './layout/logistic-clients-type/logistic-clients-type.component';
import { SharedServicesComponent } from './shared/shared-services/shared-services.component';
import { ServiceMessagerieParticulierComponent } from './layout/service-messagerie-particulier/service-messagerie-particulier.component';
import { CareersComponent } from './layout/careers/careers.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TrackingComponent } from './layout/tracking/tracking.component';
import { NearbyPointsModalComponent } from './layout/nearby-points-modal/nearby-points-modal.component';




@NgModule({ 
  declarations: [
    CardComponent,
    TimelineComponent,
    AboutComponent,
    AdressInputComponent,
    AppComponent,
    NavbarComponent,
    HeroComponent,
    NewsComponent,
    RelayPointMapComponent,
    PopupMapComponent,
    CarouselComponent,
    RelayPointInfoComponent,
    FooterComponent,
    ServicesComponent,
    ReferencesComponent,
    CounterComponent,
    FeaturedServicesComponent,
    CtaComponent,
    ServiceMessagerieComponent,
    ServiceLogistiqueComponent,
    ServiceLogistiqueEcomComponent,
    ServiceMessagerieEcomComponent,
    CarouselComponent,
    OffreMessagerieComponent,
    OffreLogistiqueComponent,
    OffreMessagerieCustomizedComponent,
    ClientTypeComponent,
    LogisticClientsTypeComponent,
    SharedServicesComponent,
    ServiceMessagerieParticulierComponent,
    CareersComponent,
    AdressInputComponent,
    TrackingComponent,
    NearbyPointsModalComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {
 
}

