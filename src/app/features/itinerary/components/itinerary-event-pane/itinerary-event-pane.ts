import { Component, computed, inject, input } from '@angular/core';
import { Event } from '../../../../shared/models/event.model';
import { DatePipe, NgClass } from '@angular/common';
import { EventService } from '../../../../core/services/event-service';

@Component({
  selector: 'traverse-itinerary-event-pane',
  imports: [DatePipe],
  templateUrl: './itinerary-event-pane.html',
  styleUrl: './itinerary-event-pane.scss',
})
export class ItineraryEventPane {

  private _eventService = inject(EventService);

  public events = computed(() => this._eventService.events());
  public selectedEvent = computed(() => this._eventService.selectedEvent());

  public selectCoordinate(event: Event): void {
    this._eventService.selectEvent(event);
  }
}