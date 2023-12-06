import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreMessagerieComponent } from './offre-messagerie.component';

describe('OffreMessagerieComponent', () => {
  let component: OffreMessagerieComponent;
  let fixture: ComponentFixture<OffreMessagerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreMessagerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreMessagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
