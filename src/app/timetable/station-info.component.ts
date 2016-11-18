import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../core/api.service';
import { ApiUrl } from '../core/api-url';
import { SearchDirection } from '../core/search-direction';

const MILLISECONDS_IN_AN_HOUR = 60 * 60 * 1000;

@Component({
    templateUrl: './station-info.component.html'
})
export class StationInfoComponent implements OnInit {

    private stationEvents: any[];
    private station: any;

    private locationIndex: number;
    private stationEventType: string;
    private referenceLocalDateTime: Date;

    private searchParams: any;

    constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,
        private router: Router) { }     

    ngOnInit() {        
        
        this.activatedRoute.params.forEach((params: Params) => {
        
            if (params['referenceLocalDateTime']) {
                this.locationIndex = parseInt(params['locationIndex']);
                this.stationEventType = params['stationEventType'];
                this.referenceLocalDateTime = new Date(parseInt(params['referenceLocalDateTime']));

                this.apiService.post(ApiUrl.stationInfoApiUrl, {
                    stationIndex: this.locationIndex,
                    referenceLocalDateTime: this.referenceLocalDateTime,
                    stationEventType: this.stationEventType,
                    }).forEach((result) => {
                        this.station = {
                            index: result.locationIndex,
                            displayName: result.locationName,
                        };
                        this.stationEvents = result.events;
                });
            }
            else {
                let now = new Date();
                now = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 
                    now.getHours(), now.getMinutes(), 0));

                this.referenceLocalDateTime = now;

                this.stationEventType = 'departure';
                this.locationIndex = 9029;

                this.station = {
                    "displayName": "Bucuresti Nord Gara A",
                    "index": 9029,
                    "isCity": false,
                    "countryName": "Romania"
                };
            }
        });
    }

    loadEvents(hoursOffset: number) {
        this.referenceLocalDateTime = new Date(this.referenceLocalDateTime.getTime()
            + hoursOffset * MILLISECONDS_IN_AN_HOUR);
        this.search();
    }

    search() {
        this.router.navigate(['/timetable/station-info', 
            this.station.index,
            this.stationEventType,
            this.referenceLocalDateTime.getTime(),
        ]);
    }
}