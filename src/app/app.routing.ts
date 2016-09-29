import { ModuleWithProviders } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

import { BookingComponent } from './booking/booking.component';
import { BookingStep } from './core/booking-step';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/booking',
        pathMatch: 'full'
    },
    {
        path: 'booking',
        component: BookingComponent,
        data: { 
            step: BookingStep.searchStep,
        }
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);