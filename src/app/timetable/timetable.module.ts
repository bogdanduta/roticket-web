import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TimetableComponent } from './timetable.component';
import { StationInfoComponent } from './station-info.component';
import { TrainInfoComponent } from './train-info.component';
import { timetableRouting } from './timetable.routing';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        timetableRouting,
        SharedModule
    ],
    declarations: [
        TimetableComponent,
        StationInfoComponent,
        TrainInfoComponent        
    ],
    providers: [        
    ]
})
export class TimetableModule {}