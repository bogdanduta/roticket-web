import  { SearchDirection } from './search-direction';
import  { DateTime } from './date-time';

export class JourneySearchParams {
    departureLocationIndex: number;
    arrivalLocationIndex: number;
    searchCriteria = 'DurationFirst';

    constructor(
        public referenceLocalDateTime: Date,
        public searchDirection: SearchDirection,        
        public minTransferTime: number,
        public maxNumberOfChanges: number,
        public resultsCount: number){
    }
}