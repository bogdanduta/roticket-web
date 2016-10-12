import { Component } from '@angular/core';
import { BookingService } from './booking.service';
import { BookingStep } from './booking-step';

import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl:  'app/booking/booking.component.html'
})
export class BookingComponent{

    constructor(private bookingService: BookingService) {
    }       
}