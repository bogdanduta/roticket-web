import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent }     from './home.component';

//https://www.npmjs.com/package/angular2-router-loader

const appRoutes: Routes = [
    //{ path: '', redirectTo: 'booking', pathMatch: 'full'},
    {path:'', component: HomeComponent },
    { path: 'booking', loadChildren: './booking/booking.module#BookingModule' },
    { path: 'timetable', loadChildren: './timetable/timetable.module#TimetableModule' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);