import { Injectable }   from '@angular/core';
import { ApiService }   from '../core/api.service';
import { ApiUrl }   from '../core/api-url';
import { Router, ActivatedRoute, NavigationStart, Event as NavigationEvent } from '@angular/router';

import  { DateTime } from '../core/date-time';
import  { SearchDirection } from '../core/search-direction';
import { JourneySearchParams }   from '../core/journey-search-params';

//import * as _ from 'underscore/underscore';
//var _ = require('underscore');
import { BookingStep } from './booking-step';

const MILLISECONDS_IN_A_MINUTE:number = 60 * 1000;
const MILLISECONDS_IN_A_SECOND:number = 1000;

@Injectable()
export class BookingService {

    bookingSteps: BookingStep[];
    currentStep: BookingStep;

    showSpinner: boolean = false;
    showRoutes: boolean = false;
    isReferenceDateCalendarOpened: boolean = false;
    searchParams: JourneySearchParams;
    returnSearchParams: JourneySearchParams;
    searchType: string;

    journeyResults: number = 4;
    journeyGroupList: any[];

    departureLocation: any;
    arrivalLocation: any;

    outwardJourney: any;
    returnJourney: any;

    private minTransferTimeList: number[] = [1,2,3,4,5,6];
    private resultsCountList: number[] = [10,15,20,25,30,35,40,45,50,55,60];

    constructor(
        private apiService: ApiService,
        public router: Router,
        private activatedRoute: ActivatedRoute) {

        this.departureLocation = {
            displayName: "Bucuresti Nord Gara A", 
            index: 9029, 
            isCity: false,
            countryName: "Romania"
        };

        this.arrivalLocation = {
                displayName: "Budapest-Keleti", 
                index: 9050, 
                isCity: false,
                countryName: "Hungary"
        };
        
        this.bookingSteps = BookingStep.bookingSteps;
        this.searchType = 'oneWay';

        //let now = new Date();
        let now = new Date(2016, 11, 1, 21, 30, 0);
        now = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 
            now.getHours(), now.getMinutes(), 0));

        this.searchParams = new JourneySearchParams (now, SearchDirection.Forward, 5, 5, 1);
        this.returnSearchParams = new JourneySearchParams (now, SearchDirection.Forward, 5, 5, 1);           
    }

    getStepStatus(step: BookingStep): string {
        
        if(!this.currentStep){
            return "";
        }
        if (step.orderNumber < this.currentStep.orderNumber) {
            return 'ok';
        }
        if (step.orderNumber === this.currentStep.orderNumber) {
            return 'current';
        }
        return "";
    }

    changeSearchType(newSearchType:string) {
        this.searchType = newSearchType;
    }

    search() {
        this.router.navigate(['booking/select/outward']).then((navigationSucceeds) => {
            if(navigationSucceeds){
                this.beginSearch(); 
            }
        });
    }

    beginSearch() {
        let queryParams: any = { };

        if (this.router.url === '/booking/select/outward') {                        
            Object.assign(queryParams, this.searchParams);
            queryParams.departureLocationIndex = this.departureLocation.index;
            queryParams.arrivalLocationIndex = this.arrivalLocation.index;
        } else {
            Object.assign(queryParams, this.returnSearchParams);
            queryParams.departureLocationIndex = this.arrivalLocation.index; 
            queryParams.arrivalLocationIndex = this.departureLocation.index;
        }

        this.journeyGroupList = [];
        
        this.getNextJourney(queryParams, queryParams.resultsCount);
    }

    modifyJourney() {
        this.outwardJourney = null;
        this.returnJourney = null;
        this.router.navigate(['booking/search']);
    }

    getNextJourney(queryParams: JourneySearchParams, remainingJourneys: number) {
        if (remainingJourneys == 0) {
            return;
        }

        this.showSpinner = true;
        
        this.apiService.post(ApiUrl.journeyApiUrl, queryParams).toPromise().then( (result) => {

            this.showSpinner = false;
            this.showRoutes = true;

            let referenceJourney = result.journeyList[0];

            this.journeyGroupList.push(result.journeyList);          

            //increse referenceLocalDateTime by 1 minute from last departureLocalDateTime
            queryParams.referenceLocalDateTime = new Date(new Date(referenceJourney.departureLocalDateTime)
                .getTime() + MILLISECONDS_IN_A_MINUTE);        

            this.getNextJourney(queryParams, remainingJourneys - 1);

        }, (error) => {

            this.showSpinner = false;
            console.error(error.message);
        });
    }

    swapLocations() {
        let temp = this.arrivalLocation;
        this.arrivalLocation = this.departureLocation;
        this.departureLocation = temp;
    }

    loadLaterJourneys(): void {

        let queryParams: any = {};

        if (this.router.url === '/booking/select/outward') {
            Object.assign(queryParams, this.searchParams);
            queryParams.departureLocationIndex = this.departureLocation.index;
            queryParams.arrivalLocationIndex = this.arrivalLocation.index;
        } else {
            Object.assign(queryParams, this.returnSearchParams);
            queryParams.departureLocationIndex = this.arrivalLocation.index;
            queryParams.arrivalLocationIndex = this.departureLocation.index;
        }

        let referenceJourney = this.journeyGroupList[this.journeyGroupList.length - 1][0];
        queryParams.referenceLocalDateTime = new Date(new Date(referenceJourney.departureLocalDateTime)
                .getTime() + MILLISECONDS_IN_A_MINUTE);
        queryParams.searchDirection = 'forward';

        this.showSpinner = true; 
        this.apiService.post(ApiUrl.journeyApiUrl, queryParams).toPromise().then((result) => {  
            this.showSpinner = false;          
            this.journeyGroupList.push(result.journeyList);
        });
    }

    loadEarlierJourneys(): void {
        let queryParams: any = {};

        alert('Not implemented!');
        if (1===1) return;        

        if (this.router.url === '/booking/select/outward') {
            //angular.copy(this.searchParams, queryParams);
            Object.assign(queryParams, this.searchParams);
            queryParams.departureLocationIndex = this.departureLocation.index;
            queryParams.arrivalLocationIndex = this.arrivalLocation.index;
        } else { // 'booking.select.return'
            //angular.copy(this.returnSearchParams, queryParams);
            Object.assign(queryParams, this.returnSearchParams);
            queryParams.departureLocationIndex = this.arrivalLocation.index;
            queryParams.arrivalLocationIndex = this.departureLocation.index;
        }

        //var firstArrivalLocalDateTime = new Date(_.first(this.journeyList).arrivalLocalDateTime);
        var firstArrivalLocalDateTime = new Date();
        queryParams.referenceLocalDateTime = new Date(firstArrivalLocalDateTime.getTime() - 60000);
        queryParams.searchDirection = 'backward';

        this.showSpinner = true;
        this.apiService.post(ApiUrl.journeyApiUrl, queryParams).toPromise().then((result) => {
            result.journeyList.forEach((journey:any) => {
                this.journeyGroupList.unshift(journey);
                this.showSpinner = false;
            });
        });
    }

    setOutwardJourney(journey: any) {
        this.outwardJourney = journey;
        this.router.navigate(this.searchType === 'oneWay' ? ['booking/select/offer'] : ['booking/select/return'])
            .then((navigationSucceeds) => {
                if(navigationSucceeds) {
                    this.beginSearch(); 
                }
            });       
    }

    setReturnJourney(journey: any) {
        this.returnJourney = journey;
        this.router.navigate(['booking/select/offer'])
    }

    showSetOutwardJourneyButton(): boolean {
        return this.router.url === '/booking/select/outward';
    }

    showSetReturnJourneyButton(): boolean {
        return this.router.url === '/booking/select/return';
    }
}