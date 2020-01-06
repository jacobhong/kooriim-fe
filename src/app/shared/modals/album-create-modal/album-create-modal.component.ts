import { PhotoServiceComponent } from './../../../photo-gallery/photo-service/photo-service.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/model/model';

@Component({
  selector: 'app-album-create-modal',
  templateUrl: './album-create-modal.component.html',
  styleUrls: ['./album-create-modal.component.scss']
})
export class AlbumCreateModalComponent implements OnInit {
  @Output() submitted: EventEmitter<any> = new EventEmitter();
  album: Album;
  constructor(private photoService: PhotoServiceComponent) {
    this.album = new Album();
    this.album.title = '';
    this.album.description = '';
    this.album.photoIds = [];
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('creating album wtih');
    console.log(this.album.title + ' ' + this.album.description + ' ' + this.album.photoIds);
    this.photoService.createAlbum(this.album).subscribe(result => {
      console.log('created album ' + result);
    });
    this.submitted.emit();
  }
}
