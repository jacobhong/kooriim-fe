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
  // range = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl()
  // });
  // startDate: number;
  // endDate: number;

  // startMinDate: Date;
  // startMaxDate: Date;
  // endMinDate: Date;
  // endMaxDate: Date; 
  constructor(private photoService: PhotoServiceComponent) {
   }

  ngOnInit() {
  }

  // startDateInput(event: MatDatepickerInputEvent<Date>) {
  //   this.endMinDate = new Date(event.value.getFullYear(), event.value.getMonth() + 3, event.value.getDate());
  //   this.endMaxDate = new Date(event.value.getFullYear(), event.value.getMonth() + 3, event.value.getDate());
  //   this.startDate = event.value.valueOf();
  // }

  // endDateInput(event: MatDatepickerInputEvent<Date>) {
  //   this.endDate = event.value.valueOf();
  // }

  // googleSync() {
  //   this.photoService.googleSync(this.startDate, this.endDate).subscribe(result => {
  //     console.log('finished sgoogle sync');
  //   });
  // }

}