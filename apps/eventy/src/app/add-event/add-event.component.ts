import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'eventy-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  eventForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<AddEventComponent>,
  ) { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      venue: new FormControl('', [Validators.required]),
      imgURL: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  addEvent() {
    this.dialogRef.close(this.eventForm.value);
  }

}