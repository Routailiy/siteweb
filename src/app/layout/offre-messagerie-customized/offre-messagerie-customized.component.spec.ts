import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreMessagerieCustomizedComponent } from './offre-messagerie-customized.component';

describe('OffreMessagerieCustomizedComponent', () => {
  let component: OffreMessagerieCustomizedComponent;
  let fixture: ComponentFixture<OffreMessagerieCustomizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreMessagerieCustomizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreMessagerieCustomizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
