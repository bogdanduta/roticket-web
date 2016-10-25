import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'minutesToTimeSpan'})
export class MinutesToTimeSpanPipe implements PipeTransform {
  transform(totalMinutes: number): string {
    
    let hours =  Math.floor(totalMinutes / 60);
    let result = '';
    
    if (hours < 10) {
        result += '0';        
    }    
    result += hours + ':';

    let minutes = totalMinutes % 60;
    if (minutes < 10) {
        result += '0';
    }
    result += minutes;
 
    return result;
  }
}