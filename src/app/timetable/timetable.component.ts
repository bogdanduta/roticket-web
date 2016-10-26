import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../core/api.service';
import { ApiUrl } from '../core/api-url';

const MILLISECONDS_IN_AN_HOUR = 60 * 60 * 1000;

@Component({
    templateUrl: './timetable.component.html'
})
export class TimetableComponent {}
