import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventService } from '../event/event.service';
import { IEvent } from '../model/event.model';

@Component({
  selector: 'eventy-event-board',
  templateUrl: './event-board.component.html',
  styleUrls: ['./event-board.component.scss']
})
export class EventBoardComponent {

  myEvents: IEvent[];
  otherEvents: IEvent[];

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private event: EventService,
    private toast: MatSnackBar
  ) {
    this.event.MyEvents.subscribe((events) => {
      this.myEvents = events;
    });

    this.event.OtherEvents.subscribe((events) => {
      this.otherEvents = events;
    });
  }

  username(): string {
    return this.auth.User.email;
  }

  refresh() {
    this.event.loadOtherEvents();
  }

  logout() {
    this.auth.logout();
  }

  addEvent() {
    const dialogRef = this.dialog.open(AddEventComponent);
    dialogRef.afterClosed().subscribe((newEvent) => {
      if (newEvent.name) {
        this.event.addEvent(newEvent)
          .subscribe((response) => {
            let msg = '';
            if (response) {
              msg = 'Event added';
              this.event.loadMyEvents();
            }
            else msg = 'Event not added';
            this.toast.open(msg, '', {
              duration: 1000
            });
          });
      }
    })
  }

}