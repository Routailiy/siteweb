import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMessagerieParticulierComponent } from './service-messagerie-particulier.component';

describe('ServiceMessagerieParticulierComponent', () => {
  let component: ServiceMessagerieParticulierComponent;
  let fixture: ComponentFixture<ServiceMessagerieParticulierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMessagerieParticulierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceMessagerieParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
