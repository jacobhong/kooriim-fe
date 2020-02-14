import { PhotoServiceComponent } from '../photo-service/photo-service.component';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Photo } from 'src/app/shared/model/model';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

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
  loading = false;
  constructor(private spinner: SpinnerComponent, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private photoService: PhotoServiceComponent) {
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
      this.loading = true;
      this.photoService
        .getPhotoById(this.photos[this.index].id)
        .subscribe(photo => {
          this.imgSrc = photo.base64SrcPhoto;
          this.photosCache[this.index] = photo.base64SrcPhoto;
          this.cacheUpdated.emit(this.photosCache);
        }, () => { }, () => { this.loading = false; });
    }
  }

  onPrevious() {
    --this.index;
    this.showButtons();
    if (this.photosCache[this.index]) {
      this.imgSrc = this.photosCache[this.index];
    } else {
      this.loading = true;
      this.photoService
        .getPhotoById(this.photos[this.index].id)
        .subscribe(photo => {
          this.imgSrc = photo.base64SrcPhoto;
          this.photosCache[this.index] = photo.base64SrcPhoto;
          this.cacheUpdated.emit(this.photosCache);
        }, () => { }, () => { this.loading = false; });
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
