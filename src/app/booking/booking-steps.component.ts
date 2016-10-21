import { Component } from '@angular/core';
import { BookingService } from './booking.service';

@Component({
    selector: 'rtt-booking-steps',
    templateUrl: './booking-steps.component.html'
})
export class BookingStepsComponent{
    constructor(private bookingService: BookingService){}
}