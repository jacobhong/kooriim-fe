import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PhotoServiceComponent } from '../photo/photo-service/photo-service.component';

@Component({
  selector: 'app-google-sync',
  templateUrl: './google-sync.component.html',
  styleUrls: ['./google-sync.component.scss']
})
export class GoogleSyncComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  startMinDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date; 
  constructor(private photoService: PhotoServiceComponent) {
    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 20, 0, 1);
    // this.maxDate = new Date(currentYear + 1, 11, 31);
   }

  ngOnInit() {
    console.log('google');
  }

  startDateInput(event: MatDatepickerInputEvent<Date>) {
    console.log('start input ' + event.value);
    console.log('start input ' + event.value.getDate());
    // console.log('start input ' + event.value.getDay());
    console.log('start input ' + event.value.getFullYear());
    console.log('start input ' + event.value.getMonth());
    this.endMinDate = new Date(event.value.getFullYear(), event.value.getMonth() + 3, event.value.getDate());
    this.endMaxDate = new Date(event.value.getFullYear(), event.value.getMonth() + 3, event.value.getDate());
    console.log(this.endMaxDate);
  }

  endDateInput(event: MatDatepickerInputEvent<Date>) {
    console.log('end input ' + event.value);
  }

  googleSync() {
    this.photoService.googleSync().subscribe(result => {
      console.log('finished sgoogle sync');
    });
  }

}
