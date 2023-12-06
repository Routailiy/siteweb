import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelayPointInfoComponent } from './relay-point-info.component';

describe('RelayPointInfoComponent', () => {
  let component: RelayPointInfoComponent;
  let fixture: ComponentFixture<RelayPointInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelayPointInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelayPointInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
