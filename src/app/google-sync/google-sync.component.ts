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
  startDate: number;
  endDate: number;

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
  }

  startDateInput(event: MatDatepickerInputEvent<Date>) {
    this.endMinDate = new Date(event.value.getFullYear(), event.value.getMonth() + 3, event.value.getDate());
    this.endMaxDate = new Date(event.value.getFullYear(), event.value.getMonth() + 3, event.value.getDate());
    this.startDate = event.value.valueOf();
  }

  endDateInput(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value.valueOf();
  }

  googleSync() {
    this.photoService.googleSync(this.startDate, this.endDate).subscribe(result => {
      console.log('finished sgoogle sync');
    });
  }

}