import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import * as L from 'leaflet';
import { EventService } from '../../../../core/services/event-service';
import { Coordinate } from '../../../../shared/types/coordinate.type';
import { Event } from '../../../../shared/models/event.model';
import { EventModal } from "../../../event/event-modal/event-modal";
import { MapService } from '../../../../core/services/map-service';

@Component({
  selector: 'traverse-map',
  imports: [EventModal],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map {
  public mapContainer = viewChild<ElementRef>('mapContainer');
  public map!: L.Map;
  public events = computed(() => this._eventService.events());
  public locations = computed(() => this._mapService.locations());
  public eventModalIsOpen = signal<boolean>(false);
  public eventModalPos = signal<{ x: number, y: number }>({ x: 0, y: 0 });
  public markerCoords = computed(() => { 
      return {
                latitude: this._newMarker()?.getLatLng().lat ?? 0, 
                longitude: this._newMarker()?.getLatLng().lng ?? 0
             }
    });

  private _resizeObserver!: ResizeObserver;
  private _startingPos: GeolocationPosition | null = null;
  private _markers: L.Marker[] = [];
  private _newMarker = signal<L.Marker | null>(null);
  private static readonly _SPACE_FROM_MARKER = 10;

  private _eventService = inject(EventService);
  private _mapService = inject(MapService);

  constructor() {

    effect(() => {
      const eventsLen = this.events().length;

      if (eventsLen > 0) {
        const firstEvent = this.events()[0];
        this._eventService.selectEvent(firstEvent);
        this.setMapView(firstEvent.coordinates);
      }
    });

    effect(() => {
      const coordinate = this._eventService.selectedEvent()?.coordinates;

      if (!this.map) return;
      this.setMapView(coordinate ?? { latitude: 0, longitude: 0 });
    });

    effect(() => {
      this.initMapMarkers();
    });

    this._eventService.eventsSubject$.subscribe({
      next: (res) => {
        const marker = this._newMarker();
        if (!marker) return;

        this.openModal(false, false);
        this.createMarker(marker);
      }
    });
  }


  ngAfterViewInit(): void {
    this.initMap();
    this.map.on('dblclick', (e) => this.addEvent(e));
  }

  public setModalPosition(point: { x: number, y: number }) {
    this.eventModalPos.set({ x: point.x, y: point.y });
  }

  public openModal(isOpen: boolean, cleanup: boolean = true): void {
    this.eventModalIsOpen.set(isOpen);

    if (!isOpen && cleanup) {
      this._newMarker.update((marker) => { 
        marker?.removeFrom(this.map); 
        return null;
      });

    }
  }

  public addEvent(e: L.LeafletMouseEvent): void {

    const { x, y } = e.containerPoint;
    const { lat, lng } = e.latlng;

    this.addMarker({ latitude: lat, longitude: lng }, { order: this._eventService.getNextEventOrder() });
    const adjustedPoint = this.checkModalOverflow({ x, y });
    
    this.openModal(true);
    this.setModalPosition(adjustedPoint);
    
  }

  public addMarker(coordinate: Coordinate, eventDetails?: { id?: number, order?: number }): void {

    const marker = L.marker([coordinate.latitude, coordinate.longitude], { icon: this.createIcon(eventDetails?.order?.toString() ?? '') }).addTo(this.map);
    this._newMarker.set(marker);

  }

  public createEvent(event: Event) {
    this._eventService.createEvent(event);
  }

  public createMarker(marker: L.Marker) {
    this._markers.push(marker);

    marker.on('contextmenu', (e) => {

     });
  }

  private initMap(): void {
    const container = this.mapContainer()!.nativeElement;

    if (this.map) {
      this.map.remove();
      this.map = null!;
    }
    
    this.map = L.map(container).setView([0, 0], 13);
    this.map.doubleClickZoom.disable();

    L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
      attribution: '© Stadia Maps © OpenMapTiles © OpenStreetMap'
    }).addTo(this.map);

    this._resizeObserver = new ResizeObserver(() => {
      this.map?.invalidateSize();
    });

    this._resizeObserver.observe(container);
  }

  private setMapView(coordinate: Coordinate) {
    this.map.setView([coordinate.latitude, coordinate.longitude], 18);
  }

  private createIcon(label: string): L.DivIcon {
    return L.divIcon({
      className: 'stop-marker',
      html: `<div class="stop-marker-inner">
                <span>${label}</span>
             </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }

  private initMapMarkers() {

    for (const e of this.events()) {

      this.addMarker(e.coordinates, { id: e.id, order: e.userDefinedOrder });
    }
  }

  private checkModalOverflow(point: { x: number, y: number }): { x: number, y: number } {

    const mapEl = (this.mapContainer()?.nativeElement) as HTMLElement;
    const mapRect = mapEl.getBoundingClientRect();

    // (18 * 16) reference the width and height of the modal. Put this in a service to share between modal and map
    const overflowsRight = point.x + (18 * 16) > mapRect.width;
    const overflowsBottom = point.y + (18 * 16) > mapRect.height;

    const adjustedX = overflowsRight ? (point.x - (18 * 16) - Map._SPACE_FROM_MARKER) : (point.x + Map._SPACE_FROM_MARKER);
    const adjustedY = overflowsBottom ? (point.y - (18 * 16) - Map._SPACE_FROM_MARKER) : (point.y + Map._SPACE_FROM_MARKER);

    return { x: adjustedX, y: adjustedY }

  }


  ngOnDestroy(): void {
    this._resizeObserver?.disconnect();
    this.map?.remove();
    this.map = null!;
  }
}
