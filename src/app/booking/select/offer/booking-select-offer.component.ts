import { Component } from '@angular/core';

import {BookingService } from '../../booking.service';

@Component({
    templateUrl: 'app/booking/select/offer/booking-select-offer.component.html'
})
export class BookingSelectOfferComponent {
    constructor(private bookingService: BookingService) { }
}