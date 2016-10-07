import { Component, Input } from '@angular/core';

@Component({
    selector:'rtt-wait-segment',
    templateUrl:'app/booking/select/journey/wait-segment.component.html'
})
export class WaitSegmentComponent{
    @Input() segment: any;
} 