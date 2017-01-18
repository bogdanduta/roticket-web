//let baseApiUrl = "http://roticket.azurewebsites.net/";
let baseApiUrl = "http://localhost:59833/";
export class ApiUrl {   
    public static locationApiUrl:       string = baseApiUrl + 'api/timetable/location';
    public static journeyApiUrl:        string = baseApiUrl + 'api/timetable/journey';
    public static stationInfoApiUrl:    string = baseApiUrl + 'api/timetable/station-info';
    public static routeInfoApiUrl:      string = baseApiUrl + 'api/timetable/route-info';
}