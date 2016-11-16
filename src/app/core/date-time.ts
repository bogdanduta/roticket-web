const millisecondsInAMinute = 1000 * 60; 

export class DateTime{
    
    constructor (
        public year:number,
        public month:number,
        public day:number,
        
        public hour:number,
        public minutes:number){}

    static now(): DateTime {
        var now = new Date();
        return new DateTime(now.getFullYear(), now.getMonth() + 1,now.getDate(),
            now.getHours(), now.getMinutes());
    }
    addMinute(minutes: number): DateTime {
        var input = new Date(this.year, this.month - 1, this.day, 
            this.hour, this.minutes, 0);

        var output = new Date(input.getTime() + minutes * millisecondsInAMinute)

        var result = new DateTime(output.getFullYear(), output.getMonth() + 1, output.getDate(),
            output.getHours(), output.getMinutes());

        return result;
    }
}