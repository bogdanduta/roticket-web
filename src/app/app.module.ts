import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }    from '@angular/forms';

import { routing,
         appRoutingProviders }  from './app.routing';

import { ApiService }   from './core/api.service';

import { AppComponent }  from './app.component';
import { StationTypeaheadComponent }   from './shared/station-typeahead/station-typeahead.component';
import { DateTimeComponent }   from './shared/date-time/date-time.component';

import { BookingModule }     from './booking/booking.module';
import { TimetableModule }     from './timetable/timetable.module';


import { LoginComponent }       from './login.component';
import { DialogService }        from './dialog.service';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,

    routing,

    BookingModule,
    TimetableModule,
  ],
  declarations: [ 
    AppComponent
  ],
  providers:[
    ApiService,
    appRoutingProviders,
    DialogService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
