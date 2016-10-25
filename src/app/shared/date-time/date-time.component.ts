import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { RODateParserFormatter } from './date-parser-formatter';

@Component({
    selector:'rtt-date-time',
    templateUrl:'./date-time.component.html',
    //providers: [{ provide: NgbDateParserFormatter, useClass: RODateParserFormatter }] // define custom NgbDatepickerI18n provider
})
export class DateTimeComponent implements OnChanges {

    @Input() dateTime: Date;
    @Output() dateTimeChange = new EventEmitter();

    private date: NgbDateStruct;
    private time: NgbTimeStruct;
    private lastHour = -1;

    ngOnChanges() {
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

    constructor(){ }

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

            //newDateTime = new Date(newDateTime.getTime() - newDateTime.getTimezoneOffset() * 60000);

        this.dateTimeChange.emit(newDateTime);
    }
}


