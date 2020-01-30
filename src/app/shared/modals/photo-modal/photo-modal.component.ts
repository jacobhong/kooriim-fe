import { PhotoServiceComponent } from './../../../photo-gallery/photo-service/photo-service.component';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Photo } from 'src/app/model/model';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() cacheUpdated: EventEmitter<any> = new EventEmitter();
  photos: Photo[];
  photosCache: {};
  imgSrc: string;
  index: number;
  numOfImages: number;
  showPrevious: boolean;
  showNext: boolean;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private photoService: PhotoServiceComponent) {
    this.showPrevious = false;
    this.showNext = false;
    iconRegistry.addSvgIcon(
      'navigate_before',
      sanitizer.bypassSecurityTrustResourceUrl('assets/mat-icons/navigate_before-24px.svg'));
    iconRegistry.addSvgIcon(
      'navigate_next',
      sanitizer.bypassSecurityTrustResourceUrl('assets/mat-icons/navigate_next-24px.svg'));
    iconRegistry.addSvgIcon(
      'delete_sweep',
      sanitizer.bypassSecurityTrustResourceUrl('assets/mat-icons/delete_sweep-24px.svg'));
  }

  ngOnInit() {
    this.showButtons();
  }

  onNext() {
    ++this.index;
    this.showButtons();
    if (this.photosCache[this.index]) {
      this.imgSrc = this.photosCache[this.index];
    } else {
      this.photoService
        .getPhotoById(this.photos[this.index].id)
        .subscribe(photo => {
          this.imgSrc = photo.base64SrcPhoto;
          this.photosCache[this.index] = photo.base64SrcPhoto;
          this.cacheUpdated.emit(this.photosCache);
        });
    }
  }

  onPrevious() {
    --this.index;
    this.showButtons();
    if (this.photosCache[this.index]) {
      console.log(this.photosCache);
      this.imgSrc = this.photosCache[this.index];
    } else {
      console.log(this.photos);
      this.photoService
        .getPhotoById(this.photos[this.index].id)
        .subscribe(photo => {
          this.imgSrc = photo.base64SrcPhoto;
          this.photosCache[this.index] = photo.base64SrcPhoto;
          this.cacheUpdated.emit(this.photosCache);
        });
    }
  }

  onDelete() {
    this.photoService
      .deletePhoto(this.photos[this.index].id)
      .subscribe(photo => {
        this.photos.splice(this.index, 1);
        delete this.photosCache[this.index];
        this.cacheUpdated.emit(this.photosCache);
        this.closeModal.emit();
      });
  }

  showButtons() {
    this.showPrevious = this.index <= 0 ? false : true;
    this.showNext = this.index + 1 >= this.numOfImages ? false : true;
  }

}
