import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fixTimezone'})
export class FixTimezonePipe implements PipeTransform {
  transform(date: any): Date {   
    if(typeof date == 'string'){
      date = new Date(date);
    }  
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  }
}