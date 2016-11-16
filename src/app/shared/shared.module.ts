import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DateTimeDirectionComponent } from './date-time-direction/date-time-direction.component';
import { StationTypeaheadComponent } from './station-typeahead/station-typeahead.component';
import { OperatingCalendarComponent } from './operating-calendar/operating-calendar.component';

import { MinutesToTimeSpanPipe } from './pipes/minutesToTimeSpan.pipe';
import { MinutesToLocalTimePipe } from './pipes/minutesToLocalTime.pipe';
import { FixTimezonePipe } from './pipes/fix-timezone.pipe';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NgbModule,
        RouterModule
    ],
    declarations: [
        DateTimeDirectionComponent,
        StationTypeaheadComponent,
        OperatingCalendarComponent,
        MinutesToTimeSpanPipe,
        MinutesToLocalTimePipe,
        FixTimezonePipe
    ],
    exports: [
        NgbModule,
        DateTimeDirectionComponent,
        StationTypeaheadComponent,
        OperatingCalendarComponent,
        MinutesToTimeSpanPipe,
        MinutesToLocalTimePipe,
        FixTimezonePipe
    ]
})
export class SharedModule {}