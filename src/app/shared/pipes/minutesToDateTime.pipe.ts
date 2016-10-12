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
@Pipe({name: 'minutesToDateTime'})
export class MinutesToDateTimePipe implements PipeTransform {
  transform(totalMinutes: number): string {
    
    let hours =  Math.floor(totalMinutes / 60);
    let result = '';
    
    if (hours < 10) {
        result = '0' + hours + ':';
    }
    let minutes = totalMinutes % 60;
    if (minutes < 10) {
        result += '0' + minutes;
    }
 
    return result;
  }
}