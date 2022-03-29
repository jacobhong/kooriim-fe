import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { AlbumServiceComponent } from 'src/app/album/album-service/album-service.component';
import { Album } from 'src/app/shared/model/model';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
import { PhotoServiceComponent } from '../photo-service/photo-service.component';
import { Router } from '@angular/router';
interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-album-modal',
  templateUrl: './add-album-modal.component.html',
  styleUrls: ['./add-album-modal.component.scss']
})
export class AddAlbumModalComponent implements OnInit, AfterContentChecked {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  selectedValue: string;
  albums: Album[];
  albumId: number;
  photoIds: number[];
  constructor(private albumService: AlbumServiceComponent, private photoService: PhotoServiceComponent,
    private cdr: ChangeDetectorRef,
    private router: Router) {

  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.cdr.detectChanges();

    this.albumService
      .getAlbums()
      .subscribe(albums => {
        console.log('got albums');
        this.albums = albums;
        console.log(JSON.stringify(this.albums));
        this.cdr.detectChanges();

      });
  }
  onSelect(event) {
    this.cdr.detectChanges();

    console.log('selected');
    console.log(event);
    console.log('albumId' + this.albumId);
    if (this.albumId != null) {
      this.photoService.movePhotosToAlbum(this.albumId, event.title, this.photoIds).subscribe(result => {
        this.router.navigate(['albums']);
        this.closeModal.emit();
      });
    } else {
      console.log('adding to album not moving ' + event.id + ' ' + this.photoIds);
      this.photoService.addPhotoIdsToAlbum(event.id, this.photoIds).subscribe(result => {
        console.log('FINISHED ADDING TO ALBUM CLOSE');
        this.router.navigate(['albums']);
        this.closeModal.emit();
      }); 
    }
  }

}
