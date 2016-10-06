import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
@Component({
    templateUrl: 'app/booking/select/booking-select.component.html'
})
export class BookingSelectComponent {
    constructor(private bookingService: BookingService) { }
}