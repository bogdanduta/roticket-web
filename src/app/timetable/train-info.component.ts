import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../core/api.service';
import { ApiUrl } from '../core/api-url';

@Component({
    templateUrl: 'app/timetable/train-info.component.html'
})
export class TrainInfoComponent implements OnInit {

    private referenceLocalDateTime: Date;
    private operatingSchedules: any[];
    private data: any[] = [];
    private showOpDays: boolean = false;

    constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,) { }     


    ngOnInit() { 
        this.activatedRoute.params.forEach((params: Params) => {

            this.referenceLocalDateTime = new Date(parseInt(params['referenceLocalDateTime']));

            this.apiService.post(ApiUrl.routeInfoApiUrl, {
                serviceIndex: parseInt(params['serviceIndex'])
            }).forEach((result) => {
                this.data = result;
                this.operatingSchedules = result.operatingSchedules.map((operatingSchedule:any) => {
                    return {
                        serviceIndex: operatingSchedule.serviceIndex,
                        firstDayOfOperation: new Date(operatingSchedule.firstDayOfOperation),
                        operatingDays: operatingSchedule.operationSchedule,
                    }
                });
            });
        });
    }
}