import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
@Component({
    templateUrl: './booking-select.component.html'
})
export class BookingSelectComponent {
    constructor(private bookingService: BookingService) { }
}