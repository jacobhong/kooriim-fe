import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() loading: boolean;
  @Input() value: number = 100;
  @Input() diameter: number = 100;
  @Input() mode: string = "indeterminate";
  @Input() strokeWidth: number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = "primary";

  constructor() {
    this.loading = false;
   }

  /**
   * receives all HTTP requests and filters them by the filterBy
   * values provided
   */
  ngOnInit() {
   
  }

  show() {
    this.loading = true;
    console.log('show');
    console.log(this.loading);
  }

  hide() {
    this.loading = false;
    console.log('hide');
  }

}
