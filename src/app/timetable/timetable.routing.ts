import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimetableComponent } from './timetable.component';
import { TrainInfoComponent } from './train-info.component';

const timetableRoutes: Routes = [
    { path: 'timetable', component: TimetableComponent },
    { path: 'station-info/:locationIndex/:stationEventType/:referenceLocalDateTime', component: TimetableComponent },
    { path: 'train-info/:serviceIndex/:referenceLocalDateTime', component: TrainInfoComponent },
];

export const timetableRouting: ModuleWithProviders = RouterModule.forChild(timetableRoutes);