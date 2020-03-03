import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollingComponent implements OnInit {
  @Output() scrolled: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onScroll() {
    console.log('scrolling');
    this.scrolled.emit({});

  }

}
