import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';

const MILLISECONDS_IN_A_DAY:number = 24 * 60 * 60 * 1000;

@Component({
    selector: 'rtt-operating-calendar',
    templateUrl: './operating-calendar.component.html'
})
export class OperatingCalendarComponent implements OnChanges {
    @Input() operatingSchedules: any;
    @Input() selectedLocalDateTime: Date;
  
    constructor() { }
    
    private monthNames = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    private dayNames = ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'];

    private months: any[];
    private selectedMonth: any;

    //ngOnInit(): void {
    ngOnChanges(): void {
        if (!this.operatingSchedules) {
            return;
        }
        let firstDaysOfOperation = this.operatingSchedules.map((os:any) => {
            return new Date(os.firstDayOfOperation);
        }); 
        firstDaysOfOperation.sort();  
        let firstDayOfOperation = firstDaysOfOperation[0]; 

        let lastDaysOfOperation = this.operatingSchedules.map((os:any) => {
            return new Date(os.firstDayOfOperation.getTime() + MILLISECONDS_IN_A_DAY * (os.operatingDays.length - 1));
        }); 
        lastDaysOfOperation.sort();  
        let lastDayOfOperation = lastDaysOfOperation[lastDaysOfOperation.length - 1];

        //let firstDayOfOperation = _.min<Date>(this.operatingSchedules.map((os: any) => {
        //   return os.firstDayOfOperation;
        //}));
        
        //let lastDayOfOperation = new Date();
        //let lastDayOfOperation = _.max<Date>(this.operatingSchedules.map((os: any) => {
        //    return new Date(os.firstDayOfOperation.getTime() + MILLISECONDS_IN_A_DAY * (os.operatingDays.length - 1));
        //}));

        let calendarBeginMonth = new Date(firstDayOfOperation.getFullYear(), firstDayOfOperation.getMonth());
        let calendarEndMonth = new Date(lastDayOfOperation.getFullYear(), lastDayOfOperation.getMonth());

        let currentMonthDate = calendarBeginMonth;
        
        let monthByIndex:any[] = [];
        
        this.months = [];
        while (currentMonthDate <= calendarEndMonth) {
            let operatingMonth = this.createBlankOperatingMonth(currentMonthDate);
            let year = currentMonthDate.getFullYear();
            if (monthByIndex[year] === undefined) {
                monthByIndex[year] = [];
            }
            var month = currentMonthDate.getMonth();
            monthByIndex[year][month] = operatingMonth;
            this.months.push(operatingMonth);

            currentMonthDate = this.getNextMonth(currentMonthDate);
        }

        //set operating days
        this.operatingSchedules.forEach((os:any, distinctIndex:number) => {
            for (var i = 0; i < os.operatingDays.length; i++) {
                if (os.operatingDays.charAt(i) === '1') {
                    let operatingDate = new Date(os.firstDayOfOperation.getTime() + MILLISECONDS_IN_A_DAY * i);
                    let year = operatingDate.getFullYear();
                    let month = operatingDate.getMonth();
                    let day = operatingDate.getDate();

                    let operatingMonth = monthByIndex[year][month];

                    let operatingDay = operatingMonth.weekDaysByIndex[day];
                    operatingDay.isOperating = true;
                    operatingDay.distinctIndex = distinctIndex;
                    operatingDay.date = operatingDate;
                    operatingDay.serviceIndex = os.serviceIndex;
                }
            }
        });

        //set operatingTypeClass
        monthByIndex.forEach((operatingYear) => {
            operatingYear.forEach((operatingMonth:any) => {
                operatingMonth.operatingTypeClass = 'none';
                if (operatingMonth.weekDaysByIndex.some(function (operatingDay:any) { 
                    return operatingDay.isOperating; 
                })) {
                    operatingMonth.operatingTypeClass = 'partial';
                }
                if (operatingMonth.weekDaysByIndex.every(function (operatingDay:any) { 
                    return operatingDay.isOperating; 
                })) {
                    operatingMonth.operatingTypeClass = 'full';
                }
            });
        });


        //set current date
        let currentTrafficMonth = monthByIndex[this.selectedLocalDateTime.getFullYear()][this.selectedLocalDateTime.getMonth()];
        currentTrafficMonth.weekDaysByIndex[this.selectedLocalDateTime.getDate()].isSelected = true;

        this.selectedMonth = currentTrafficMonth;
    }

    getNextMonth(month:Date): Date {
        let currentMonth:Date;
        if (month.getMonth() === 11) {
            currentMonth = new Date(month.getFullYear() + 1, 0, 1);
        } else {
            currentMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
        }
        return currentMonth;
    }

    createBlankOperatingMonth(currentMonthDate:Date): any {
        let weekDays:any[] = [];
        let weekDaysByIndex:any[] = [];

        let operatingMonth = {
            date: currentMonthDate,
            name: this.monthNames[currentMonthDate.getMonth()],
            weekDays: weekDays,
            weekDaysByIndex: weekDaysByIndex,
        };

        let startDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1);
        let endDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0);

        let firstDayOffset = (startDate.getDay() + 6) % 7; // 5 - vineri
        let numberOfDaysInMonth = endDate.getDate(); //31
        let numberOfWeeksInMonth = Math.ceil((firstDayOffset + numberOfDaysInMonth) / 7);

        //create blank calendar
        this.dayNames.forEach(function (dayName, index) {
            weekDays[index] = {
                dayName: dayName,
                dayNumbers: [],
            };
            for (var i = 0; i < numberOfWeeksInMonth; i++) {
                weekDays[index].dayNumbers.push({});
            }
        });

        //set day numbers
        for (var dayNumber = 0; dayNumber < numberOfDaysInMonth; dayNumber++) {
            let dayNumberIncludingOffset = firstDayOffset + dayNumber;
            let column = dayNumberIncludingOffset % 7;
            let line = Math.floor(dayNumberIncludingOffset / 7);

            let operatingDay = {
                displayText: dayNumber + 1,
                isOperating: false
            };
            weekDays[column].dayNumbers[line] = operatingDay;

            weekDaysByIndex[dayNumber + 1] = operatingDay;
        }

        return operatingMonth;
    }
}
