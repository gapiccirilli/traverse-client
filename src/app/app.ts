import { Component, signal } from '@angular/core';
import { MapView } from "./features/itinerary/pages/itinerary-view/itinerary-view";

@Component({
  selector: 'app-root',
  imports: [/*RouterOutlet,*/ MapView],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('traverse-client');
}
