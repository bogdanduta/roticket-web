import { Component, Input } from '@angular/core';

@Component({
    selector:'rtt-walk-segment',
    templateUrl:'./walk-segment.component.html'
})
export class WalkSegmentComponent{
    @Input() segment: any;
} 