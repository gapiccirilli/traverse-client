import { Component, computed, effect, inject, input, output, signal, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../../shared/models/event.model';
import { FormsModule } from '@angular/forms';
import { MapService } from '../../../core/services/map-service';

@Component({
  selector: 'traverse-event-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './event-modal.html',
  styleUrl: './event-modal.scss',
})
export class EventModal {
  public dimensions = { width: 18, height: 18};
  public currentPos = input.required<{ x: number, y: number }>();
  public coordinates = input.required<{ latitude: number, longitude: number }>();
  public locations = computed(() => this._mapService.locations());
  public displayLocation = computed(() => this.locations()?.features[0]);
  public closeModal = output<boolean>();
  public createEvent = output<Event>();

  public currentEvent: Event = new Event();

  private _mapService = inject(MapService);

  constructor() {
    effect(() => {
      if (this.displayLocation()) {
        this.currentEvent.location = this.displayLocation()!.properties.fullAddress;
      }
    });
  }

  ngOnInit() {
    this.currentEvent.coordinates = this.coordinates();
    this._mapService.getLocationsByCoordinates(this.currentEvent.coordinates);
  }

  public onCloseModal(): void {
    this.closeModal.emit(false);
  }

  public onCreate(): void {
    this.createEvent.emit(this.currentEvent);
  }
}
