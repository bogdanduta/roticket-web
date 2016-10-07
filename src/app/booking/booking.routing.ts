import { ModuleWithProviders } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';

import { BookingComponent } from './booking.component';
import { BookingHomeComponent } from './booking-home.component';
import { BookingSearchComponent } from './search/booking-search.component';
import { BookingSelectComponent } from './select/booking-select.component';
import { BookingSelectJourneyComponent } from './select/journey/booking-select-journey.component';
import { BookingSelectOfferComponent } from './select/offer/booking-select-offer.component';

const bookingRoutes: Routes = [
    {
        path: 'booking',
        component: BookingComponent,
        children: [
            {
                path: 'home',
                component: BookingHomeComponent
            },
            {
                path: 'search',
                component: BookingSearchComponent,                
            },
            {
                path: 'select',
                component: BookingSelectComponent,      
                children: [
                    {
                        path: 'outward',
                        component: BookingSelectJourneyComponent
                    },
                     {
                        path: 'return',
                        component: BookingSelectJourneyComponent
                    },
                    {
                        path: 'offer',
                        component: BookingSelectOfferComponent,                
                    }                  
                ]          
            }
        ]
    },
    {
        path: '',
        redirectTo: '/booking/home',
        pathMatch: 'full'
    },
];

export const bookingRouting: ModuleWithProviders = RouterModule.forChild(bookingRoutes);