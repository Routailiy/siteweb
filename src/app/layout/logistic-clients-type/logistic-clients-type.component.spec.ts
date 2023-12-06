import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticClientsTypeComponent } from './logistic-clients-type.component';

describe('LogisticClientsTypeComponent', () => {
  let component: LogisticClientsTypeComponent;
  let fixture: ComponentFixture<LogisticClientsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticClientsTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticClientsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
