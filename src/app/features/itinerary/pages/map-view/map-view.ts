import { Component, OnInit, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'traverse-map-view',
  imports: [CommonModule],
  templateUrl: './map-view.html',
  styleUrl: './map-view.scss',
})
export class MapView implements OnInit, AfterViewInit {

  mapContainer = viewChild<ElementRef>('mapContainer');
  map!: L.Map;
  private resizeObserver!: ResizeObserver;
  private startingPos: GeolocationPosition | null;

  constructor() { this.startingPos = null; }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.startingPos = pos;
      this.map.setView([this.startingPos.coords.latitude, this.startingPos.coords.longitude], 13);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const container = this.mapContainer()!.nativeElement;

    if (this.map) {
      this.map.remove();
      this.map = null!;
    }
    
    this.map = L.map(container).setView([0, 0], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.resizeObserver = new ResizeObserver(() => {
      this.map?.invalidateSize();
    });

    this.resizeObserver.observe(container);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
    this.map = null!;
  }
}
