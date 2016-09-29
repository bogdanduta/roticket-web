import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {

  constructor(private http: Http) {}

  get(url: string, config: Object): Observable<any> {
    return this.http
      .get(url, config)
      .map((r:Response) => r.json().data as any[]);
  }

   getLocations(name:string ): Observable<any> {
    return this.http
      .get(`http://localhost:59833/api/timetable/location?name=${name}`)
      .map((r:Response) => 
        r.json() as any[]);
  }

  post(url: string, config: Object): Observable<any> {
    return this.http
      .post(url, config)
      .map((r:Response) => r.json().data as any[]);
  }
}