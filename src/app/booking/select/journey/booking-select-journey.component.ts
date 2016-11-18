import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../booking.service';

@Component({
    templateUrl: './booking-select-journey.component.html'
})
export class BookingSelectJourneyComponent {
    constructor(private bookingService: BookingService) { }  
}