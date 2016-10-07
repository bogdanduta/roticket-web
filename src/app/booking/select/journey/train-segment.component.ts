import { Component, Input } from '@angular/core';

@Component({
    selector:'rtt-train-segment',
    templateUrl:'app/booking/select/journey/train-segment.component.html'
})
export class TrainSegmentComponent{
    @Input() segment: any;
    
    getReferenceLocalDateTime(trainReferenceLocalDateTime:number): number {
                return (new Date(trainReferenceLocalDateTime)).getTime();
    }
} 