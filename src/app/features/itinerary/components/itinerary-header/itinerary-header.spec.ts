import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryHeader } from './itinerary-header';

describe('ItineraryHeader', () => {
  let component: ItineraryHeader;
  let fixture: ComponentFixture<ItineraryHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ItineraryHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
