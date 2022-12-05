import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { customEvent } from 'src/CustomEvent';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  constructor(private httpclient: HttpClient) { }

  getEvents(): Observable<any>{
    const date = new Date();
    const start = `${date.getMonth() == 1? (date.getFullYear()) : (date.getFullYear()-1)}-${date.getMonth()-1}-01`;
    const end = `${date.getMonth() == 12? (date.getFullYear()) : (date.getFullYear()+1)}-${date.getMonth()+1}-01`;

    return this.httpclient.get(`http://localhost:4000/events?start=${start}&end=${end}`);
  }

  getCalendarEvents(eventslst:customEvent[]): CalendarEvent[]{
  let calendarEventslst:CalendarEvent[] = [];
  for(var value of eventslst){
    calendarEventslst.push({
      id: value.id,
      start: value.startTime,
      end: value.endTime,
      title: value.title,
      meta: value.description
    });
  }
  console.log(calendarEventslst);
  return calendarEventslst;
}

  // getCalendarEvents(): CalendarEvent[]{
  //   let eventslst:customEvent[];
  //   let calendarEventslst:CalendarEvent[] = [];

  //   this.getEvents().subscribe(
  //     data => {
  //       eventslst = data;
  //       for(var value of eventslst){
  //         calendarEventslst.push({
  //           id: value.id,
  //           start: new Date(value.startTime),
  //           end: new Date(value.endTime),
  //           title: value.title,
  //           meta: value.description
  //         });
  //       }
  //       //console.log(calendarEventslst);
  //     }
  //   );

  //   return calendarEventslst;
  // }
}

// getCalendarEvents(eventslst:customEvent[]): CalendarEvent[]{
//   let calendarEventslst:CalendarEvent[] = [];
//   for(var value of eventslst){
//     calendarEventslst.push({
//       id: value.id,
//       start: value.startTime,
//       end: value.endTime,
//       title: value.title,
//       meta: value.description
//     });
//   }
//   console.log(calendarEventslst);
//   return calendarEventslst;
// }
