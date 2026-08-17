import { Coordinate } from "../types/coordinate.type";

export class GeocodeResult {
    features: Feature[] = []
}

export interface Feature {
    coordinates: Coordinate,
    properties: GeocodeProperties
}

export interface GeocodeProperties {
    fullAddress: string,
    coordinates: Coordinate
}