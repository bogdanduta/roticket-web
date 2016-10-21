import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector:'rtt-date-time',
    templateUrl:'./date-time.component.html'
})
export class DateTimeComponent {

    @Input() dateTime: Date;
    @Output() dateTimeChange = new EventEmitter();

    private date: NgbDateStruct;
    private time: NgbTimeStruct;
    private lastHour = -1;

    constructor(){
        if(!this.dateTime){
            let now = new Date();
            this.dateTime = new Date(
                now.getFullYear(), now.getMonth(),now.getDate(),
                now.getHours(), now.getMinutes(), 0);
        }
        this.date = {
            year: this.dateTime.getFullYear(),
            month: this.dateTime.getMonth(),
            day: this.dateTime.getDate()
        };    

        this.time = {
            hour: this.dateTime.getHours(),
            minute:this.dateTime.getMinutes(),
            second:this.dateTime.getSeconds()
        };   

        this.lastHour = this.time.hour;    
    }

    change(): void {

        if(this.date == null || this.time == null){
            return;
        }

        // if((this.time.hour == 0 && this.lastHour == 23) 
        //     || (this.time.hour == 23 && this.lastHour == 0)){
            
        //     let currentDate = new Date(
        //         this.date.year,
        //         this.date.month,
        //         this.date.day);

        //     currentDate.setDate(currentDate.getDate() + this.time.hour == 0 ? -1 : 1);

        //     this.date = {
        //         year: currentDate.getFullYear(),
        //         month: currentDate.getMonth(),
        //         day: currentDate.getDate(),
        //     };
        // }

        this.lastHour = this.time.hour;

        let newDateTime = new Date(
            this.date.year,
            this.date.month,
            this.date.day,
            this.time.hour,
            this.time.minute,
            this.time.second);

        this.dateTimeChange.emit(newDateTime);
    }
}
