import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
    constructor(private http: Http) {}

    getEvents(params?: URLSearchParams) {
        return this.http.get('http://localhost:8087/v1/events',
        { search: params })
        .map((res:Response) => res.json());
    }

    getEvent(slug: string) {
        return this.http.get('http://localhost:8087/v1/events/' + slug,)
        .map((res:Response) => res.json());
    }
}
