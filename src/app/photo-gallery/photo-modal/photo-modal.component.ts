import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
  numOfImages: number;
  showPrevious: boolean;
  showNext: boolean;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.showPrevious = false;
    this.showNext = false;
    iconRegistry.addSvgIcon(
      'navigate_before',
      sanitizer.bypassSecurityTrustResourceUrl('assets/mat-icons/navigate_before-24px.svg'));
    iconRegistry.addSvgIcon(
      'navigate_next',
      sanitizer.bypassSecurityTrustResourceUrl('assets/mat-icons/navigate_next-24px.svg'));
  }

  ngOnInit() {
    this.showButtons();
  }

  onNext() {
    ++this.index;
    this.showButtons();
    this.next.emit({ index: this.index });
  }

  onPrevious() {
    --this.index;
    this.showButtons();
    this.previous.emit({ index: this.index });
  }

  showButtons() {
    this.showPrevious = this.index <= 0 ? false : true;
    this.showNext = this.index + 1 >= this.numOfImages ? false : true;
  }

}
