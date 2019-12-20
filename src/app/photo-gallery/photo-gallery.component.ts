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
      .getThumbnails()
      .subscribe(result => {
        console.log('got thumbnails');
        console.log(result);
        this.photos = result;
      });
  }

  loadSrcPhoto(filePath) {
    console.log(filePath);
    this.photoService.getBase64Image(filePath).subscribe(result => {
      console.log('got image ' + result);
      const win = window.open();
      const base64SrcPhoto = result;
      win.document.write('<img src="' + base64SrcPhoto + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></img>');
    });
  }

}
