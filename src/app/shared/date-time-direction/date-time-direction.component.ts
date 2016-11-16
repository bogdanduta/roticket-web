import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { RODateParserFormatter } from './date-parser-formatter';

import { SearchDirection } from '../../core/search-direction';
import { DateTime } from '../../core/date-time';

@Component({
    selector:'rtt-date-time-direction',
    templateUrl:'./date-time-direction.component.html',
    //providers: [{ provide: NgbDateParserFormatter, useClass: RODateParserFormatter }] // define custom NgbDatepickerI18n provider
})
export class DateTimeDirectionComponent implements OnChanges, OnInit {

    @Input() dateTime: Date;
    @Output() dateTimeChange = new EventEmitter<Date>();

    @Input() direction: string;
    @Output() directionChange = new EventEmitter<string>();

    @Input() directionValues: string[];

    private date: NgbDateStruct;
    private time: NgbTimeStruct;
    
    constructor(){
        this.updateUIBindings();
    }
    
    updateUIBindings(){
        if(this.dateTime){
            this.date = {
                //year: this.dateTime.year,
                year: this.dateTime.getUTCFullYear(),
                //month: this.dateTime.month,
                month: this.dateTime.getUTCMonth() + 1,
                //day: this.dateTime.day
                day: this.dateTime.getUTCDate()
            };
            this.time = {
                //hour: this.dateTime.hour,
                hour: this.dateTime.getUTCHours(),
                //minute: this.dateTime.minutes,
                minute: this.dateTime.getUTCMinutes(),
                second: 0
            };            
        }                
    }

    ngOnInit(){
        this.updateUIBindings();
    }
    
    ngOnChanges() {
        this.updateUIBindings();
    }

    onDirectionChange(){
        this.directionChange.emit(this.direction); 
    }

    onDateTimeChange() {

        if(this.date == null || this.time == null){
            return;
        }

        this.dateTime = new Date(Date.UTC(
            this.date.year,
            this.date.month - 1,
            this.date.day,
            this.time.hour,
            this.time.minute,
            0));

        this.dateTimeChange.emit(this.dateTime);
    }
}


