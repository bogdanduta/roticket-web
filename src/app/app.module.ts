import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }    from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing }              from './app.routing';
import { ApiService }   from './core/api.service';
import { BookingService }   from './core/booking.service';

import { AppComponent }  from './app.component';
import { BookingComponent }   from './booking/booking.component';
import { BookingSearchComponent }   from './booking/search/booking-search.component';
import { StationTypeaheadComponent }   from './shared/station-typeahead/station-typeahead.component';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    routing,
    NgbModule,
    FormsModule 
  ],
  declarations: [ 
    AppComponent,
    BookingComponent,
    BookingSearchComponent,
    StationTypeaheadComponent 
  ],
  providers:[
    ApiService,
    BookingService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
