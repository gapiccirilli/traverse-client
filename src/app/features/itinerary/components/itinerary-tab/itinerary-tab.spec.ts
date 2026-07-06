import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryTab } from './itinerary-tab';

describe('ItineraryTab', () => {
  let component: ItineraryTab;
  let fixture: ComponentFixture<ItineraryTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryTab],
    }).compileComponents();

    fixture = TestBed.createComponent(ItineraryTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
