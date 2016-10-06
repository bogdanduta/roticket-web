export class JourneySearchParams {
    searchDirection: string;
    referenceLocalDateTime: Date;
    minTransferTime: number;
    maxNumberOfChanges: number;
    resultsCount: number;
    searchCriteria: string;
    stationValidityInMinutes: number;
    departureLocationIndex: number;
    arrivalLocationIndex: number;
    ignoreTransitLocalTrains: boolean;
}