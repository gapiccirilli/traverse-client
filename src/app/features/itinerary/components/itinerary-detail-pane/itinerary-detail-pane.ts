import { Component, computed, inject } from '@angular/core';
import { EventDetail } from '../../../event/components/event-detail/event-detail';
import { EventService } from '../../../../core/services/event-service';

@Component({
  selector: 'traverse-itinerary-detail-pane',
  imports: [EventDetail],
  templateUrl: './itinerary-detail-pane.html',
  styleUrl: './itinerary-detail-pane.scss',
})
export class ItineraryDetailPane {
  private _eventService = inject(EventService);

  public selectedEvent = computed(() => this._eventService.selectedEvent());
}
