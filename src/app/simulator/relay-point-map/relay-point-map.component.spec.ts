import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelayPointMapComponent } from './relay-point-map.component';

describe('RelayPointMapComponent', () => {
  let component: RelayPointMapComponent;
  let fixture: ComponentFixture<RelayPointMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelayPointMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelayPointMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
