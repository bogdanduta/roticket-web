import { Component } from '@angular/core';
import { BookingService } from './booking.service';
import { BookingStep } from './booking-step';

import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl:  'app/booking/booking.component.html'
})
export class BookingComponent {

    constructor(private bookingService: BookingService) { }   

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