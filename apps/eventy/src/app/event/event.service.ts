import { Injectable } from '@angular/core';
import { IEvent } from '../model/event.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private myEvents: Subject<IEvent[]>;
  private otherEvents: Subject<IEvent[]>;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.myEvents = new Subject();
    this.otherEvents = new Subject();
  }

  public addEvent(event: IEvent): Observable<boolean> {
    return this.http.post<any>(environment.api + '/event/add', {
      event: event,
      userid: this.auth.User.id
    }, {
      headers: {
        jwt: this.auth.User.token
      }
    }).pipe(
      map((response) => {
        if (response) return true;
        else return false;
      })
    );
  }

  public loadEvents() {
    this.loadMyEvents();
    this.loadOtherEvents();
  }

  public loadMyEvents() {
    this.http.post<any>(environment.api + '/event/myevents', {
      userid: this.auth.User.id
    }, {
      headers: {
        jwt: this.auth.User.token
      }
    })
    .subscribe((events) => {
      this.myEvents.next(events);
    });
  }

  public loadOtherEvents() {
    this.http.post<any>(environment.api + '/event/otherevents', {
      userid: this.auth.User.id
    }, {
      headers: {
        jwt: this.auth.User.token
      }
    })
    .subscribe((events) => {
      this.otherEvents.next(events);
    });
  }

  public get MyEvents(): Subject<IEvent[]> {
    return this.myEvents;
  }

  public get OtherEvents(): Subject<IEvent[]> {
    return this.otherEvents;
  }

}