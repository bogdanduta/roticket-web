import { Component, Input } from '@angular/core';
import { BookingService } from '../../booking.service';

@Component({
    selector:'rtt-journey-detail',
    templateUrl: './journey-details.component.html'
})
export class JourneyDetailsComponent {

    @Input() journey: any;
    constructor(private bookingService: BookingService) { }
}