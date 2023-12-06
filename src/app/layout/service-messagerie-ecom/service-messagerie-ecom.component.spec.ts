import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMessagerieEcomComponent } from './service-messagerie-ecom.component';

describe('ServiceMessagerieEcomComponent', () => {
  let component: ServiceMessagerieEcomComponent;
  let fixture: ComponentFixture<ServiceMessagerieEcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMessagerieEcomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceMessagerieEcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
