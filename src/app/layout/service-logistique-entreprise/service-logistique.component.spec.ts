import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLogistiqueComponent } from './service-logistique.component';

describe('ServiceLogistiqueComponent', () => {
  let component: ServiceLogistiqueComponent;
  let fixture: ComponentFixture<ServiceLogistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceLogistiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceLogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
