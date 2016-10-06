import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../booking.service';

@Component({
    templateUrl: 'app/booking/select/journey/booking-select-journey.component.html'
})
export class BookingSelectJourneyComponent implements OnInit {
    constructor(private bookingService: BookingService) { }

    ngOnInit(): void{
        this.bookingService.beginSearch(); 
    }
  
}