import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../core/api.service';
import { ApiUrl } from '../core/api-url';

@Component({
    templateUrl: './train-info.component.html'
})
export class TrainInfoComponent implements OnInit {

    private referenceLocalDateTime: Date;
    private operatingSchedules: any[];
    private trainStops: any[];
    private facilitySegments: any[];
    private pricingCategorySegments: any[];
    private serviceBrand: string;
    private serviceNumber: string;
    private serviceMode: string;

    private showOpDays: boolean = false;

    constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,) { }     


    ngOnInit() { 
        this.activatedRoute.params.forEach((params: Params) => {

            this.referenceLocalDateTime = new Date(parseInt(params['referenceLocalDateTime']));

            this.apiService.post(ApiUrl.routeInfoApiUrl, {
                serviceIndex: parseInt(params['serviceIndex'])
            }).forEach((result) => {
                this.serviceBrand = result.serviceBrand;
                this.serviceNumber = result.serviceNumber;
                this.serviceMode = result.serviceMode;

                this.trainStops = result.trainStops;
                this.facilitySegments = result.facilitySegments;
                this.pricingCategorySegments = result.pricingCategorySegments;

                this.operatingSchedules = result.operatingSchedules.map((os:any) => {
                    return {
                        serviceIndex: os.serviceIndex,
                        firstDayOfOperation: new Date(os.firstDayOfOperation),
                        operatingDays: os.operationSchedule,
                    }
                });
            });
        });
    }
}