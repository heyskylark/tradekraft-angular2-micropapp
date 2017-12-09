import { DateAbbr } from './../shared/date-abbr/date-abbr';
import { EventService } from './../services/event.service';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'app/services/snackbar.service';
import { URLSearchParams } from '@angular/http';
import { Event } from './../model/event';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as moment from 'moment-timezone';

@Component({
    selector: 'events',
    templateUrl: './event.component.html'
  })
  export class EventComponent implements OnInit {
    private events: Event[];
    private pastEvents: Event[];
    private highlightedEvent: Event;
    private officialEventsOnly: boolean = false;

    private defaultImage: string = "assets/images/preload-image.jpg";
    private errorImage: string = "assets/images/error-image.jpg";

    constructor(private eventService: EventService, private activatedRoute: ActivatedRoute,
      private snackbarService: SnackbarService, private formBuilder: FormBuilder, private dateAbbr: DateAbbr) {}

    ngOnInit() {
      this.highlightedEvent = this.activatedRoute.snapshot.data['highlightedEvent'];

      this.getPastTradeKraftEvents();

      this.getEvents();
    }

    onChange(e) {
      this.officialEventsOnly = e.checked;
      this.getEvents();
    }

    getEvents() {
      this.eventService.getEvents(new URLSearchParams(this.getQueryString())).subscribe(data => {
        this.events = data.content;
      },
      err => {
        console.log("error", err);
        this.snackbarService.openSnackbar("There was a problem getting the events.");
      });
    }

    getPastTradeKraftEvents() {
      let urlSearchParams = new URLSearchParams('officialEvents=true&pastEvents=true');

      this.eventService.getEvents(urlSearchParams).subscribe(data => {
        this.pastEvents = data.content;
      }, err => {
        console.log("error gettting past events: ", err);
      })
    }

    getQueryString(): string {
      let query: string;

      if(this.officialEventsOnly) {
        query = "officialEvents=" + this.officialEventsOnly;
      }

      return query
    }

    getEventMonth(event: Event): string {
      return moment(event.startDateTime).format('MMM');
    }

    getEventDay(event: Event): string {
      return moment(event.startDateTime).format('DD');
    }

    getWeekday(event: Event): string {
      return moment(event.startDateTime).format('dddd');
    }

    formatCity(event: Event): string {
      if(event.country.toLowerCase() === 'united states') {
        return event.city + ", " + this.dateAbbr.abbrDate(event.state, 'abbr');
      }

      return event.city + ", " + event.country;
    }

    hasPastEvents(): boolean {
      return this.pastEvents && this.pastEvents.length > 0;
    }
  }