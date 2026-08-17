import { computed, inject, Injectable, signal } from "@angular/core";
import { Event } from "../../shared/models/event.model";
import { HttpClient, httpResource } from "@angular/common/http";
import { Subject } from "rxjs";
import { environment as env } from "../../../environments/environment";

@Injectable({ providedIn: 'root'})
export class EventService {

    private _http = inject(HttpClient);

    private _selectedEvent = signal<Event | null>(null);
    private _eventModalIsOpen = signal<boolean>(false);
    // private _itineraryId = signal<number | null>(null);
    private _itineraryId = signal<number | null>(5);

    private _events = httpResource<Event[]>(() => {
        const id = this._itineraryId();
        if (!id) return undefined;

        return `${env.baseUrl}/api/itineraries/${id}/events`;
    });

    public eventsSubject$: Subject<Event> = new Subject();

    public selectedEvent = this._selectedEvent.asReadonly();
    public eventModalIsOpen = this._eventModalIsOpen.asReadonly();
    public events = computed(() => (this._events.value() ?? []).sort((a: Event, b: Event) => (a.userDefinedOrder ?? 0) - (b.userDefinedOrder ?? 0)));

    public selectEvent(event: Event): void {
        this._selectedEvent.set(event);
        console.log(event);
    }

    public isEventModalOpen(isOpen: boolean) {
        this._eventModalIsOpen.set(isOpen);
    }

    public createEvent(event: Event): void {
        const id = this._itineraryId();
        this._http.post<Event>(`${env.baseUrl}/api/itineraries/${id}/events/`, event).subscribe({
            next: (res) => {
                this._events.update((e) => [...(this._events.value() ?? []), event])
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