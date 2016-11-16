import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fixTimezone'})
export class FixTimezonePipe implements PipeTransform {
  transform(date: Date): Date {     
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  }
}