import { Injectable }   from '@angular/core';
import { ApiService }   from './api.service';
import { ApiUrl }   from './api-url';
import { Router, ActivatedRoute }       from '@angular/router';
import { JourneySearchParams }   from './journeySearchParams';

import * as _ from 'underscore';
import { BookingStep } from './booking-step';

const MILLISECONDS_IN_A_MINUTE:number = 60 * 1000;
const MILLISECONDS_IN_A_SECOND:number = 1000;

@Injectable()
export class BookingService {

    bookingSteps: BookingStep[];
    currentStep:BookingStep;

    showSpinner: boolean = false;
    showRoutes: boolean = false;
    isReferenceDateCalendarOpened: boolean = false;
    searchParams: JourneySearchParams;
    returnSearchParams: JourneySearchParams;
    searchType: string;

    journeyResults: number = 4;
    journeyList: any[];

    departureLocation: any;
    arrivalLocation: any;

    outwardJourney: any;
    returnJourney: any;

    constructor(
        private apiService: ApiService,
        public router: Router,
        private route: ActivatedRoute) {

        this.route.data.toPromise().then((data:any) => {
            this.currentStep = data.step;
        });

        this.bookingSteps = BookingStep.bookingSteps;
        this.searchType = 'oneWay';

        let now = new Date();

        let referenceLocalDateTime = new Date(now.getTime()
            - now.getTimezoneOffset() * MILLISECONDS_IN_A_MINUTE
            - now.getSeconds() * MILLISECONDS_IN_A_SECOND
            - now.getMilliseconds());

        this.searchParams = {
            searchDirection: 'forward',
            referenceLocalDateTime: referenceLocalDateTime,
            minTransferTime: 5,
            maxNumberOfChanges: 5,
            resultsCount: 1,
            searchCriteria: 'DurationFirst',
            stationValidityInMinutes: 7 * 60,
            arrivalLocationIndex: null,
            departureLocationIndex: null,
            ignoreTransitLocalTrains: true,
        };

        this.returnSearchParams = {
            searchDirection: 'forward',
            referenceLocalDateTime: referenceLocalDateTime,
            minTransferTime: 5,
            maxNumberOfChanges: 5,
            resultsCount: 1,
            searchCriteria: 'DurationFirst',
            stationValidityInMinutes: 7 * 60,
            arrivalLocationIndex: null,
            departureLocationIndex: null,
            ignoreTransitLocalTrains:true,
        };
    }

    search(): void {
        this.router.navigate(['booking/select/outward']);
    }

    beginSearch(): void {
        let queryParams: any = {};

        if (this.router.url === 'booking/select/outward') {                        
            //angular.copy(this.searchParams, queryParams);
            Object.assign(queryParams, this.searchParams);
            queryParams.departureLocationIndex = this.departureLocation.index;
            queryParams.arrivalLocationIndex = this.arrivalLocation.index;
        } else { // 'booking/select/return'
            //angular.copy(this.returnSearchParams, queryParams);
            Object.assign(queryParams, this.returnSearchParams);
            queryParams.departureLocationIndex = this.arrivalLocation.index; 
            queryParams.arrivalLocationIndex = this.departureLocation.index;
        }

        this.journeyList = [];
        this.getNextJourney(queryParams, queryParams.resultsCount);
    }

    modifyJourney(): void {
        this.outwardJourney = null;
        this.returnJourney = null;
        this.router.navigate(['booking/search']);
    }

    getNextJourney(queryParams: JourneySearchParams, remainingJourneys: number): void {
        if (remainingJourneys == 0) {
            return;
        }

        this.showSpinner = true;
        this.apiService.post(ApiUrl.journeyApiUrl, queryParams).then((result) => {

            this.showSpinner = false;
            this.showRoutes = true;

            let durationFirstJourney = result.data.journeyList[0];

            result.data.journeyList.forEach((journey:any) => {
                this.journeyList.push(journey);
            });

            queryParams.referenceLocalDateTime = new Date(new Date(durationFirstJourney.departureLocalDateTime)
                .getTime() + MILLISECONDS_IN_A_MINUTE)
            this.getNextJourney(queryParams, remainingJourneys - 1);

        }, (error) => {

            this.showSpinner = false;
            console.error(error.data.message);
        });
    }

    swapLocations(): void {
        let temp = this.arrivalLocation;
        this.arrivalLocation = this.departureLocation;
        this.departureLocation = temp;
    }

    loadLaterJourneys(): void {

        let queryParams: any = {};

        if (this.router.url === 'booking/select/outward') {
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

        var lastDepartureLocalDateTime = new Date(_.last(this.journeyList).departureLocalDateTime);
        queryParams.referenceLocalDateTime = new Date(lastDepartureLocalDateTime.getTime() + 60000);
        queryParams.searchDirection = 'forward';

        this.showSpinner = true;
        this.apiService.post(ApiUrl.journeyApiUrl, queryParams).then((result) => {
            result.data.journeyList.forEach((journey:any) => {
                this.journeyList.push(journey);
                this.showSpinner = false;
            });
        });
    }

    loadEarlierJourneys(): void {

        let queryParams: any = {};

        if (this.router.url === 'booking/select/outward') {
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

        var firstArrivalLocalDateTime = new Date(_.first(this.journeyList).arrivalLocalDateTime);
        queryParams.referenceLocalDateTime = new Date(firstArrivalLocalDateTime.getTime() - 60000);
        queryParams.searchDirection = 'backward';

        this.showSpinner = true;
        this.apiService.post(ApiUrl.journeyApiUrl, queryParams).then((result) => {
            result.data.journeyList.forEach((journey:any) => {
                this.journeyList.unshift(journey);
                this.showSpinner = false;
            });
        });
    }

    setOutwardJourney(journey:any) {
        this.outwardJourney = journey;
        if (this.searchType === 'oneWay') {
            this.router.navigate(['booking/select/offer']);
        } else {
            this.router.navigate(['booking/select/return']);
        }
    }

    setReturnJourney(journey:any) {
        this.returnJourney = journey;
        this.router.navigate(['booking/select/offer'])
    }

    //getCurrentStep(): IBookingStep {
    //    return this.bookingState.Step;
    //}

    showSetOutwardJourneyButton(): boolean {
        return this.router.url === 'booking/select/outward';
    }

    showSetReturnJourneyButton(): boolean {
        return this.router.url === 'booking/select/return';
    }
}