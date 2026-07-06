import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarySocialPane } from './itinerary-social-pane';

describe('ItinerarySocialPane', () => {
  let component: ItinerarySocialPane;
  let fixture: ComponentFixture<ItinerarySocialPane>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItinerarySocialPane],
    }).compileComponents();

    fixture = TestBed.createComponent(ItinerarySocialPane);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
