import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { ApiUrl } from '../../core/api-url';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector:'rtt-station-typeahead',
    templateUrl:'./station-typeahead.component.html'
})
export class StationTypeaheadComponent {
    
    @Input() location: any;
    @Output() locationChange = new EventEmitter();

    private stationsOnly: boolean;
    private _searching: boolean;

    constructor(private apiService: ApiService) { }

    formatter = (x: {displayName: string}) => x.displayName;

    selectItem(event: NgbTypeaheadSelectItemEvent) {
        this.locationChange.emit(event.item);     
    }

    search = (text$: Observable<string>) => text$
        .debounceTime(300)
        .distinctUntilChanged()
        .do(term => { 
            this._searching = term.length > 0; 
        })
        .switchMap(term => 
            term === '' ? 
                Observable.of([]) : 
                this.apiService.getLocations(term))
        .do(() => { 
            this._searching = false;             
        });
}

