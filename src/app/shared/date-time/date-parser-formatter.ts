import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

export function toInteger(value:any) {
    return parseInt("" + value, 10);
}
export function toString(value:any) {
    return (value !== undefined && value !== null) ? "" + value : '';
}
export function getValueInRange(value:any, max:any, min:any) {
    if (min === void 0) { min = 0; }
    return Math.max(Math.min(value, max), min);
}
export function isString(value:any) {
    return typeof value === 'string';
}
export function isNumber(value:any) {
    return !isNaN(toInteger(value));
}
export function isDefined(value:any) {
    return value !== undefined && value !== null;
}
export function padNumber(value:any) {
    if (isNumber(value)) {
        return ("0" + value).slice(-2);
    }
    else {
        return '';
    }
}
export function regExpEscape(text:any) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export class RODateParserFormatter extends NgbDateParserFormatter {
  private static separator = '.';
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split(RODateParserFormatter.separator).reverse();
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return {year: toInteger(dateParts[0]), month: null, day: null};
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return {year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null};
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return {year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2])};
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date ?
        `${isNumber(date.day) ? padNumber(date.day) : ''}${RODateParserFormatter.separator}${isNumber(date.month) ? padNumber(date.month) : ''}${RODateParserFormatter.separator}${date.year}` :
        '';
  }
}