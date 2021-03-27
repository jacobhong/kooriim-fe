import { AlbumServiceComponent } from 'src/app/album/album-service/album-service.component';
import { PhotoServiceComponent } from '../../photo/photo-service/photo-service.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/shared/model/model';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-album-create-modal',
  templateUrl: './album-create-modal.component.html',
  styleUrls: ['./album-create-modal.component.scss']
})
export class AlbumCreateModalComponent implements OnInit {
  @Output() submitted: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();

  album: Album;
  errorMessage: string;
  albumMode: string;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private albumService: AlbumServiceComponent) {
    this.album = new Album();
    this.album.title = '';
    this.album.description = '';
    this.album.previewMediaItems = [];
    this.album.photoIds = [];
    this.albumMode = 'Create Album';
    iconRegistry.addSvgIcon(
      'delete_sweep',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/delete_sweep-24px.svg'));
  }

  ngOnInit() {

  }

  onDelete() {
    this.albumService.deleteAlbum(this.album.id).subscribe(result => {
      this.deleted.emit();
    });
  }

  onSubmit() {
    this.albumService
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
