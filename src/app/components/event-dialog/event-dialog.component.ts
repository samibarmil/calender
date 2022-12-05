import { Component, Inject, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'
import { customEvent } from 'src/CustomEvent';



@Component({
  selector: 'app-event-dialog',
  templateUrl: 'event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {
  event : customEvent;
  
  constructor(
    public dialog: MatDialog, 
    private dialogRef: MatDialogRef<EventDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) data ) {
      let start = data.start.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      let end = data.end.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    this.event = new customEvent(data.id, start, end, data.title, data.meta);

  }

  openDialog() {
    this.dialog.open(EventDialogComponent);
  }

}
