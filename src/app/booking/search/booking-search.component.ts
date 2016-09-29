import { Component } from '@angular/core';
import { BookingService } from '../../core/booking.service';

@Component({
    selector:'rtt-booking-search',
    templateUrl:'app/booking/search/booking-search.component.html'
})
export class BookingSearchComponent{
    isReferenceDateCalendarOpened: boolean = false;
    isReturnReferenceDateCalendarOpened: boolean = false;

    constructor(private bookingService: BookingService) { }

    openCalendar(): void {
        this.isReferenceDateCalendarOpened = true;
    }

    openReturnCalendar(): void {
        this.isReturnReferenceDateCalendarOpened = true;
    }

    locationUpdated(newLocation: any): void{
        if(newLocation){
            console.log(`from booking-search: ${newLocation.displayName}`);
        }
    }
}