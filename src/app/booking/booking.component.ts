import { Component, OnInit } from '@angular/core';
import { BookingService } from '../core/booking.service';
import { BookingStep } from '../core/booking-step';

import 'rxjs/add/operator/toPromise';

@Component({
    selector:'rt-booking',
    templateUrl: 'app/booking/booking.component.html'
})
export class BookingComponent implements OnInit{

    currentStep:BookingStep;

    constructor(
        private bookingService: BookingService) { }   

    ngOnInit() {

    }

    getStepStatus(step: BookingStep): string {
        if(!this.bookingService.currentStep){
            return "";
        }
        if (step.orderNumber < this.bookingService.currentStep.orderNumber) {
            return 'ok';
        }
        if (step.orderNumber === this.bookingService.currentStep.orderNumber) {
            return 'current';
        }
        return "";
    }
}