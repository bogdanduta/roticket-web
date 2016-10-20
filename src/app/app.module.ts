import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import 'bootstrap/dist/css/bootstrap.css';
import  { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    BookingComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
