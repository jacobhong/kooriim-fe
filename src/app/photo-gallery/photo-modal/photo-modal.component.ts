import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit {
  @Output() next: EventEmitter<any> = new EventEmitter();
  @Output() previous: EventEmitter<any> = new EventEmitter();
  imgSrc: string;
  index: number;
  
  constructor() {
    console.log('creating');
  }

  ngOnInit() {
    console.log('creating2');
  }

  onNext() {
    this.next.emit();
  }

  onPrevious() {
    this.previous.emit();
  }

}
