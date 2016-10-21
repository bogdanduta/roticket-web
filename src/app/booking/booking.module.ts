import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { bookingRouting } from './booking.routing';

import { BookingComponent } from './booking.component';
import { BookingStepsComponent } from './booking-steps.component';
import { BookingHomeComponent } from './booking-home.component';
import { BookingSearchComponent } from './search/booking-search.component';

import { BookingSelectComponent } from './select/booking-select.component';
import { BookingSelectJourneyComponent } from './select/journey/booking-select-journey.component';
import { JourneyDetailsComponent } from './select/journey/journey-details.component';
import { TrainSegmentComponent } from './select/journey/train-segment.component';
import { WaitSegmentComponent } from './select/journey/wait-segment.component';
import { WalkSegmentComponent } from './select/journey/walk-segment.component';

import { BookingSelectOfferComponent } from './select/offer/booking-select-offer.component';

import { SharedModule } from '../shared/shared.module';

import { BookingService } from './booking.service';
import { ApiService } from '../core/api.service';
import  { ApiUrl } from '../core/api-url';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports:[
        FormsModule,
        CommonModule,
        bookingRouting,
        NgbModule,
        SharedModule
    ],

    declarations:[
        BookingComponent,
        BookingStepsComponent,
        BookingHomeComponent,
        BookingSearchComponent,
        BookingSelectComponent,
        BookingSelectJourneyComponent,
        JourneyDetailsComponent,
        TrainSegmentComponent,
        WaitSegmentComponent,
        WalkSegmentComponent,
        
        BookingSelectOfferComponent     
    ],

    providers:[
        BookingService,
        ApiService,
        ApiUrl
    ]
})
export class BookingModule {}