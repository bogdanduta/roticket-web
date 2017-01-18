import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'minutesToLocalTime'})
export class MinutesToLocalTimePipe implements PipeTransform {
  transform(totalMinutes: number): string {
    
    let hours =  Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    
    return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
  }
}