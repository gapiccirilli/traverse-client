import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryMapToolbar } from './itinerary-map-toolbar';

describe('ItineraryMapToolbar', () => {
  let component: ItineraryMapToolbar;
  let fixture: ComponentFixture<ItineraryMapToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryMapToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(ItineraryMapToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
