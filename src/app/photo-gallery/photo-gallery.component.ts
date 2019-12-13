import { Component, OnInit } from '@angular/core';
import { PhotoServiceComponent } from './photo-service/photo-service.component';
import { Photo } from '../model/file';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  photos: Photo[];

  constructor(private photoService: PhotoServiceComponent) { }

  ngOnInit() {
    console.log('init');
    this.photoService
      .getPhotos()
      .subscribe(result => {
        console.log('got pphotos');
        console.log(result);
        this.photos = result;
      });
  }

  loadThumbnail(url) {
    console.log(url);
    window.open(url);
  }

}
