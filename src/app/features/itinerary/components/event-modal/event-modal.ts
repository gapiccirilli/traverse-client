import { Component, input, output, signal, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../shared/models/event.model';
import { FormsModule } from '@angular/forms';

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
  public closeModal = output<boolean>();
  public createEvent = output<Event>();

  public currentEvent: Event = new Event();

  ngOnInit() {
    this.currentEvent.coordinates = this.coordinates();
    console.log(this.currentEvent);
  }

  public onCloseModal(): void {
    this.closeModal.emit(false);
  }

  public onCreate(): void {
    this.createEvent.emit(this.currentEvent);
  }
}
