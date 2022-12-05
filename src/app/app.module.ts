import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { EventDialogComponent } from './components/event-dialog/event-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http'
import { EventsServiceService } from './services/events-service.service';

@NgModule({
  declarations: [
    AppComponent,
    SettingsDialogComponent,
    EventDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [EventsServiceService],
  bootstrap: [AppComponent],
  entryComponents: [EventDialogComponent]
})
export class AppModule { }
