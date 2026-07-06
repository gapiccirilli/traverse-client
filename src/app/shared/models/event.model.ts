import { Coordinate } from "../types/coordinate.type";

export class Event {
    public id: number;
    public eventName: string;
    public location: string;
    public coordinates: Coordinate;
    public eventDate: Date;
    public eventTimeZone: string;
    public duration: number | null;
    public userDefinedOrder: number;
    public itineraryId: number;

    constructor() {
        this.id = 0;
        this.eventName = '';
        this.location = '';
        this.coordinates = { latitude: 0, longitude: 0 };
        this.eventDate = new Date();
        this.eventTimeZone = '';
        this.duration = 0;
        this.userDefinedOrder = 0;
        this.itineraryId = 0;
    }
}