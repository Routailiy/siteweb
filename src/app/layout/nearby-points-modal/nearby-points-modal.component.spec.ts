import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyPointsModalComponent } from './nearby-points-modal.component';

describe('NearbyPointsModalComponent', () => {
  let component: NearbyPointsModalComponent;
  let fixture: ComponentFixture<NearbyPointsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearbyPointsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NearbyPointsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
