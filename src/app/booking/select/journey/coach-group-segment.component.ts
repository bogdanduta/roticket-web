import { Component, Input } from '@angular/core';

@Component({
    selector:'rtt-coach-group-segment',
    templateUrl:'./coach-group-segment.component.html'
})
export class CoachGroupSegmentComponent{
    @Input() segment: any;
    
    getReferenceLocalDateTime(trainReferenceLocalDateTime:number): number {
                return (new Date(trainReferenceLocalDateTime)).getTime();
    }
} 