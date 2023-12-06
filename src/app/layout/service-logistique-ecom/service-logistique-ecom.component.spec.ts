import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLogistiqueEcomComponent } from './service-logistique-ecom.component';

describe('ServiceLogistiqueEcomComponent', () => {
  let component: ServiceLogistiqueEcomComponent;
  let fixture: ComponentFixture<ServiceLogistiqueEcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceLogistiqueEcomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceLogistiqueEcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
