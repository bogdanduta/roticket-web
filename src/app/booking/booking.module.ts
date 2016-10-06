import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { bookingRouting } from './booking.routing';

import { BookingComponent } from './booking.component';
import { BookingHomeComponent } from './booking-home.component';
import { BookingSearchComponent } from './search/booking-search.component';

import { BookingSelectComponent } from './select/booking-select.component';
import { BookingSelectJourneyComponent } from './select/journey/booking-select-journey.component';
import { JourneyDetailsComponent } from './select/journey/journey-details.component';

import { BookingSelectOfferComponent } from './select/offer/booking-select-offer.component';

import { DateTimeComponent } from '../shared/date-time/date-time.component';
import { StationTypeaheadComponent } from '../shared/station-typeahead/station-typeahead.component';


import { BookingService } from './booking.service';
import { ApiService } from '../core/api.service';
import  { ApiUrl } from '../core/api-url';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MinutesToDateTimePipe } from './minutesToDateTime.pipe';
import { MinutesToLocalTimePipe } from './minutesToLocalTime.pipe';

@NgModule({
    imports:[
        FormsModule,
        CommonModule,
        bookingRouting,
        NgbModule
    ],

    declarations:[
        BookingComponent,
        BookingHomeComponent,
        BookingSearchComponent,
        BookingSelectComponent,
        BookingSelectJourneyComponent,
        JourneyDetailsComponent,

        BookingSelectOfferComponent,
        
        MinutesToDateTimePipe,
        MinutesToLocalTimePipe,

        DateTimeComponent,
        StationTypeaheadComponent
    ],

    providers:[
        BookingService,
        ApiService,
        ApiUrl
    ]
})
export class BookingModule {}