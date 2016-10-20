import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'booking',
    templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit {
    a:number;
    b:number;
    c:number;
    constructor() { }

    ngOnInit() { }
    buttonClick(): void{
        this.c = this.a + this.b;
    }
    
}