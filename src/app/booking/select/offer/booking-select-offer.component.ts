import { Component } from '@angular/core';

import {BookingService } from '../../booking.service';

@Component({
    templateUrl: './booking-select-offer.component.html'
})
export class BookingSelectOfferComponent {
    constructor(private bookingService: BookingService) { }
}