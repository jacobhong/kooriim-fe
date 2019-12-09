import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  images = [
    {img: "assets/IMG_0330.JPG"},
    {img: "assets/IMG_0366.JPG"},
    {img: "assets/IMG_0373.JPG"},
    {img: "assets/IMG_0462.JPG"},
    {img: "assets/IMG_0950.JPG"},
    {img: "assets/IMG_0967.JPG"}
  ];
  constructor() { }

  ngOnInit() {
  }

}
