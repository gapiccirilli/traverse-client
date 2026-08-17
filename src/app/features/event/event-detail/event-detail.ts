import { Component, input } from '@angular/core';
import { Event } from '../../../shared/models/event.model';
import { CoordinatePipe } from "../../../shared/pipes/coordinate.pipe";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'traverse-event-detail',
  imports: [CoordinatePipe, DatePipe],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss',
})
export class EventDetail {

  private readonly DEFAULT_TEXT: string = "No Event Selected";
  public event = input<Event | null>();
}
