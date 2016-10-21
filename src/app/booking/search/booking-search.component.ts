import { Component } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
    selector:'rtt-booking-search',
    templateUrl:'./booking-search.component.html'
})
export class BookingSearchComponent{

    constructor(private bookingService: BookingService) { }
}