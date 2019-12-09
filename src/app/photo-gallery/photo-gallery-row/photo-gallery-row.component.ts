import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo-gallery-row',
  templateUrl: './photo-gallery-row.component.html',
  styleUrls: ['./photo-gallery-row.component.scss']
})
export class PhotoGalleryRowComponent implements OnInit {
  @Input()
  imageFilepath: string;

  constructor() { }

  ngOnInit() {
  }

}
