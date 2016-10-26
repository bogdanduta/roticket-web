import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { routing,
         appRoutingProviders }  from './app.routing';

import 'bootstrap/dist/css/bootstrap.css';
import  { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService }   from './core/api.service';

import { AppComponent } from './app.component';

import { HomeComponent }     from './home.component';
//import { BookingModule }     from './booking/booking.module';
//import { TimetableModule }     from './timetable/timetable.module';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,

    routing,
    //BookingModule,
    //TimetableModule,
  ],
  declarations: [ 
    AppComponent,
    HomeComponent,
  ],
  providers:[
    ApiService,
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }