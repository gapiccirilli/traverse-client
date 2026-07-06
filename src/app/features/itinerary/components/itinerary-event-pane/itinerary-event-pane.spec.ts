import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryEventPane } from './itinerary-event-pane';

describe('ItineraryEventPane', () => {
  let component: ItineraryEventPane;
  let fixture: ComponentFixture<ItineraryEventPane>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryEventPane],
    }).compileComponents();

    fixture = TestBed.createComponent(ItineraryEventPane);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
