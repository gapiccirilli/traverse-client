import { computed, inject, Injectable, signal } from "@angular/core";
import { Event } from "../../shared/models/event.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root'})
export class EventService {

    private _http = inject(HttpClient);

    private _selectedEvent = signal<Event | null>(null);
    private _eventModalIsOpen = signal<boolean>(false);
    private _events = signal<Event[]>([
    { id: 1, eventName: "Harry Styles Concert", location: "Madison Square Garden", coordinates: { latitude: 40.75057, longitude: -73.99328 }, 
    eventDate: new Date('2026-10-11'), eventTimeZone: "Eastern Standard Time", duration: 3, userDefinedOrder: 3, itineraryId: 1 },
    { id: 2, eventName: "Bagel Date", location: "Liberty Bagels", coordinates: { latitude: 40.75249, longitude: -73.99247 }, 
    eventDate: new Date('2026-10-11'), eventTimeZone: "Eastern Standard Time", duration: 0.5, userDefinedOrder: 1, itineraryId: 1 },
    { id: 3, eventName: "NBC Store", location: "NBC", coordinates: { latitude: 40.75930, longitude: -73.98008 }, 
    eventDate: new Date('2026-10-11'), eventTimeZone: "Eastern Standard Time", duration: 0.5, userDefinedOrder: 2, itineraryId: 1 }
  ]);

    public eventsSubject$: Subject<Event> = new Subject();

    public selectedEvent = this._selectedEvent.asReadonly();
    public eventModalIsOpen = this._eventModalIsOpen.asReadonly();
    public events = computed(() => this._events().sort((a: Event, b: Event) => (a.userDefinedOrder ?? 0) - (b.userDefinedOrder ?? 0)));

    public selectEvent(event: Event): void {
        this._selectedEvent.set(event);
    }

    public isEventModalOpen(isOpen: boolean) {
        this._eventModalIsOpen.set(isOpen);
    }

    public createEvent(event: Event): void {
        this._http.post<Event>('http://localhost:5141/api/itineraries/4/events/', event).subscribe({
            next: (res) => {
                this._events.update((e) => [...this._events(), event])
                this.eventsSubject$.next(res);
            },
            error: (e) => console.log(e)
        });
    }

    public getNextEventOrder(): number {
        const len = this.events().length;

        return len > 0 ? this.events()[len - 1].userDefinedOrder + 1 : 1;
    }
}