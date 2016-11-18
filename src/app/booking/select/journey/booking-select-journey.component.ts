import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../booking.service';

@Component({
    templateUrl: './booking-select-journey.component.html'
})
export class BookingSelectJourneyComponent implements OnInit {
    constructor(private bookingService: BookingService) { 
        console.debug('BookingSelectJourneyComponent constructor');
    }

    ngOnInit(): void{
        console.debug('BookingSelectJourneyComponent ngOnInit');
        this.bookingService.beginSearch(); 
    }
  
}