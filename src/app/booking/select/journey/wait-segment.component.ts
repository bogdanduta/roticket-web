import { Component, Input } from '@angular/core';

@Component({
    selector:'rtt-wait-segment',
    templateUrl:'./wait-segment.component.html'
})
export class WaitSegmentComponent{
    @Input() segment: any;
} 