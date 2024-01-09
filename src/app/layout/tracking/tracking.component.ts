import { Component, Input } from '@angular/core';
import { TrackingInfo } from './tracking.model';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent {
  @Input() trackingData: TrackingInfo[] = [];
  isLoading: boolean = true; // Flag to control the loading state

  ngOnInit() {
    // Simulate a loading time of 5 seconds
    setTimeout(() => {
      this.isLoading = false; // After 5 seconds, set loading to false
    }, 13000);
  }
  calculateProgressWidth(trackingData: any[]): number {
    // Exemple: identifier les étapes clés de votre processus de suivi
    const keyStages = ['charge', 'discharge','delivered']; 
  
    // Identifier la dernière étape atteinte
    let lastCompletedStageIndex = -1;
    for (let i = trackingData.length - 1; i >= 0; i--) {
      const stageIndex = keyStages.indexOf(trackingData[i].operation_type);
      if (stageIndex !== -1) {
        lastCompletedStageIndex = Math.max(lastCompletedStageIndex, stageIndex);
        break; // Arrêtez dès que vous trouvez la dernière étape complétée
      }
    }
  
    // Calculer la largeur de la barre de progression
    let totalStages = keyStages.length;
    return lastCompletedStageIndex !== -1 ? ((lastCompletedStageIndex + 1) / totalStages) * 100 : 0;
  }
  getIconClass(operationType: string): string {
    switch(operationType) {
      case 'charge':
        return 'fa-solid fa-truck'; // Classe d'icône pour 'charge'
      case 'discharge':
        return 'fa-solid fa-truck'; // Classe d'icône pour 'discharge'
      case 'delivered':
        return 'i class="fa-solid fa-truck'; // Classe d'icône pour 'delivered'
      default:
        return 'fa-question'; // Icône par défaut
    }
  }
  isStageReached(stage: string): boolean {
    return this.trackingData.some(data => data.operation_type === stage);
  }
  
  
  
}
