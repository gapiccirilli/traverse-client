import { Pipe, PipeTransform } from "@angular/core";
import { Coordinate } from "../types/coordinate.type";

@Pipe({
    name: "coordinate"
})
export class CoordinatePipe implements PipeTransform {
    transform(value: Coordinate | null | undefined): string {
        if (!value) return '[]';
        return `[${value?.latitude}, ${value?.longitude}]`
    }
    
}