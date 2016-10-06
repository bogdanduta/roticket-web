import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimetableComponent } from './timetable.component'

const timetableRoutes: Routes = [
    { path: 'timetable', component: TimetableComponent }
];

export const timetableRouting: ModuleWithProviders = RouterModule.forChild(timetableRoutes);