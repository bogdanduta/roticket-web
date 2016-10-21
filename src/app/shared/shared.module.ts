import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DateTimeComponent } from './date-time/date-time.component';
import { StationTypeaheadComponent } from './station-typeahead/station-typeahead.component';
import { OperatingCalendarComponent } from './operating-calendar/operating-calendar.component';

import { MinutesToDateTimePipe } from './pipes/minutesToDateTime.pipe';
import { MinutesToLocalTimePipe } from './pipes/minutesToLocalTime.pipe';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgbModule,
        RouterModule
    ],
    declarations: [
        DateTimeComponent,
        StationTypeaheadComponent,
        OperatingCalendarComponent,
        MinutesToDateTimePipe,
        MinutesToLocalTimePipe
    ],
    exports: [
        DateTimeComponent,
        StationTypeaheadComponent,
        OperatingCalendarComponent,
        MinutesToDateTimePipe,
        MinutesToLocalTimePipe
    ]
})
export class SharedModule {}