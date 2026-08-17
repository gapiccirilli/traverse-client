import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSocial } from './event-social';

describe('EventSocial', () => {
  let component: EventSocial;
  let fixture: ComponentFixture<EventSocial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSocial],
    }).compileComponents();

    fixture = TestBed.createComponent(EventSocial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
