import { NgModule } from '@angular/core';

import { TimetableComponent } from './timetable.component';
import { timetableRouting } from './timetable.routing';


@NgModule({
    imports: [
        timetableRouting
    ],
    declarations: [
        TimetableComponent
    ],
    providers: []
})
export class TimetableModule {}