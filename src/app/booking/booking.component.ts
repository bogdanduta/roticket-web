import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { BookingStep } from './booking-step';

import 'rxjs/add/operator/toPromise';

@Component({
    template:  `
        <h2>Booking Component</h2>
        <router-outlet></router-outlet>
    `
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