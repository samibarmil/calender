import { Component, Inject,  EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})

export class SettingsDialogComponent {
  weekendVisiable : boolean = true;
  constructor(
    public dialog: MatDialog, 
    private dialogRef: MatDialogRef<SettingsDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) data ) {
      // if(data == 0)
      //   this.weekendVisiable = true;
      // else
      //   this.weekendVisiable = false;

      this.weekendVisiable = localStorage.getItem('weekendVisiable') == "true";

  }

  openDialog() {
    this.dialog.open(SettingsDialogComponent);
  }

  save(){
    this.dialogRef.close(this.weekendVisiable? "visible" : "hidden");
    localStorage.setItem('weekendVisiable',JSON.stringify(this.weekendVisiable));
  }

}
