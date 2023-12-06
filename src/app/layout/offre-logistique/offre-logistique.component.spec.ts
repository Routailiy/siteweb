import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreLogistiqueComponent } from './offre-logistique.component';

describe('OffreLogistiqueComponent', () => {
  let component: OffreLogistiqueComponent;
  let fixture: ComponentFixture<OffreLogistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreLogistiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreLogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
