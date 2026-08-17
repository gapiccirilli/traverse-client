import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Map } from '../../components/map/map';
import { ItineraryMapToolbar } from "../../components/itinerary-map-toolbar/itinerary-map-toolbar";
import { ItineraryEventPane } from "../../components/itinerary-event-pane/itinerary-event-pane";
import { ItineraryDetailPane } from "../../components/itinerary-detail-pane/itinerary-detail-pane";
import { ItineraryTab } from "../../components/itinerary-tab/itinerary-tab";

@Component({
  selector: 'traverse-itinerary-view',
  imports: [CommonModule, Map, ItineraryMapToolbar, ItineraryEventPane, ItineraryDetailPane, ItineraryTab],
  templateUrl: './itinerary-view.html',
  styleUrl: './itinerary-view.scss',
})
export class MapView {

  
}
