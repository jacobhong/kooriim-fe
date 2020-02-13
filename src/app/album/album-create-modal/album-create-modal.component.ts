import { PhotoServiceComponent } from '../../photo/photo-service/photo-service.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/shared/model/model';

@Component({
  selector: 'app-album-create-modal',
  templateUrl: './album-create-modal.component.html',
  styleUrls: ['./album-create-modal.component.scss']
})
export class AlbumCreateModalComponent implements OnInit {
  @Output() submitted: EventEmitter<any> = new EventEmitter();
  album: Album;
  errorMessage: string;
  constructor(private photoService: PhotoServiceComponent) {
    this.album = new Album();
    this.album.title = '';
    this.album.description = '';
    this.album.photoIds = [];
  }

  ngOnInit() {
  }

  onSubmit() {
    this.photoService
      .createAlbum(this.album)
      .subscribe(result => {
        console.log('created album successfuly' + result);
        this.errorMessage = undefined;
        this.submitted.emit();
      }, error => {
        console.log('error happened!');
        console.log(error);
        this.errorMessage = error.error;
      });
  }
}
