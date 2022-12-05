import { Component, Input, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {EventDialogComponent } from './components/event-dialog/event-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { customEvent } from 'src/CustomEvent';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { EventsServiceService } from './services/events-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
 
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  excludeDays: number[] = [];
  events$: Observable<CalendarEvent[]>;
  events: CalendarEvent[] = [];

  constructor(private dialog: MatDialog, private eventsService : EventsServiceService, private httpclient: HttpClient){
      
  };


  ngOnInit(){
    if(localStorage.getItem('weekendVisiable') == "false")
      this.excludeDays = [0,6];
      // this.fetchEvents();

      let cEvents :customEvent[];

      this.eventsService.getEvents().subscribe( DATA => {
        //let calendarEventslst:CalendarEvent[] = [];
        for(var value of DATA){
          this.events.push({
            id: value.id,
            start: new Date(value.startTime),
            end: new Date(value.endTime),
            title: value.title,
            meta: value.description
          });
        }
      });
      //this.events = this.eventsService.getCalendarEvents(cEvents)
      console.log(this.events);

  }

  fetchEvents() {
    // console.log("calling fetch");
    // const date = new Date();
    // const start = `${date.getMonth() == 1? (date.getFullYear()) : (date.getFullYear()-1)}-${date.getMonth()-1}-01`;
    // const end = `${date.getMonth() == 12? (date.getFullYear()) : (date.getFullYear()+1)}-${date.getMonth()+1}-01`;


      // map(({events}:{events: customEvent[]}) => {
      //     return events.map((event: customEvent)=>{ 
      //       return{
      //               id: event.id,
      //               title: event.title,
      //               start: event.startTime,
      //               end: event.endTime,
      //               meta: event.description
      //         };
      //       });
      //     })
      // );
          
    // this.eventsService.getCalendarEvents( this.eventsService.getEvents());
  //   this.events$ = this.eventsService.getEvents().pipe(
  //     map(({data}:{data: {id: number, title: string, description:string, startTime: string, endTime: string}[]}) => 
  //       {
  //         return data.map((event: customEvent)=>
  //         { 
  //           return{
  //                   id: 1,
  //                   title: "hello",
  //                   start: new Date(),
  //                   meta: "this is description"
  //             };
  //           });
  //         }));

  // }
  }

  
  title = 'calender';
  activeDayIsOpen: boolean = true;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  EVENT_LIMIT: number = 3;

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  trackByEventId = (index: number, event: CalendarEvent) =>
  event.id ? event.id : event;

  openEventDialog(event: CalendarEvent){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = event;
    this.dialog.open(EventDialogComponent, dialogConfig);
  }
  openSettingsDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.excludeDays.length;
    const dialogRef = this.dialog.open(SettingsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {if(data == "visible")
      this.excludeDays=[] 
      else if(data=="hidden") this.excludeDays= [0,6]
    }
    )
  }

  log(message){
    console.log(message);
  }
}
