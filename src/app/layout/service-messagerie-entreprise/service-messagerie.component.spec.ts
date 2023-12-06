import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMessagerieComponent } from './service-messagerie.component';

describe('ServiceMessagerieComponent', () => {
  let component: ServiceMessagerieComponent;
  let fixture: ComponentFixture<ServiceMessagerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMessagerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceMessagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
