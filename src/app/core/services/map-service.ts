import { HttpClient, httpResource } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { Coordinate } from "../../shared/types/coordinate.type";
import { GeocodeResult } from "../../shared/models/geocode-result.model";
import { environment as env } from "../../../environments/environment";

@Injectable({ providedIn: 'root'})
export class MapService {

    private _http = inject(HttpClient);
    private _geocodeType: "forward" | "reverse" = "forward";
    private _geocodeQuery = signal<string | null>(null);
    private _locations = httpResource<GeocodeResult>(() => {
        const q = this._geocodeQuery();
        if (!q) return undefined;

        return `${env.baseUrl}/api/maps/places?query=${q}&type=${this._geocodeType}`;
    });

    public locations = computed(() => this._locations.value());

    public getLocationsByCoordinates(coordinates: Coordinate): void {
        if (this._geocodeType != 'reverse') this._geocodeType = "reverse";
        const q = `${coordinates.longitude},${coordinates.latitude}`;

        this._geocodeQuery.set(q);
    }

    public getLocationsByName(name: string): void {
        if (this._geocodeType != 'forward') this._geocodeType = "forward";

        this._geocodeQuery.set(name);
    }
}