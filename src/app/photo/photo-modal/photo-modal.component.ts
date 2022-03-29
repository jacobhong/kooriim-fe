import { PhotoServiceComponent } from '../photo-service/photo-service.component';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Photo } from 'src/app/shared/model/model';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { NgModel } from '@angular/forms';
import { AlbumServiceComponent } from 'src/app/album/album-service/album-service.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAlbumModalComponent } from '../add-album-modal/add-album-modal.component';

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
  videoSrc: SafeResourceUrl;
  mediaType: string;
  index: number;
  numOfImages: number;
  showPrevious: boolean;
  showNext: boolean;
  loading = false;
  constructor(private albumService: AlbumServiceComponent, 
    private modalService: NgbModal,
    private spinner: SpinnerComponent, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private photoService: PhotoServiceComponent, private ngModelDir: NgModel) {
    this.showPrevious = false;
    this.showNext = false;
    iconRegistry.addSvgIcon(
      'navigate_before',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/navigate_before-24px.svg'));
    iconRegistry.addSvgIcon(
      'navigate_next',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/navigate_next-24px.svg'));
    iconRegistry.addSvgIcon(
      'delete_sweep',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/delete_sweep-24px.svg'));
  }

  ngOnInit() {
    this.showButtons();
  }

  onNavigate(operator: string) {
    if (operator == 'next') {
      ++this.index;
    } else {
      --this.index;
    }
    this.showButtons();
    if (this.photosCache[this.index]) {
      if (typeof this.photosCache[this.index] == 'string') {
        this.mediaType = 'photo';
        this.imgSrc = this.photosCache[this.index];
        this.videoSrc = undefined;
      } else {
        this.imgSrc = undefined;
        this.mediaType = 'video';
        this.videoSrc = this.photosCache[this.index];
      }
    } else {
      this.loading = true;
      if (this.photos[this.index].mediaType == 'photo') {
        this.mediaType = 'photo';
        this.videoSrc = undefined;
        this.photoService
          .getPhotoById(this.photos[this.index].id, 'compressedImage')
          .subscribe(photo => {
            this.imgSrc = photo.base64CompressedImage;
            this.photosCache[this.index] = photo.base64CompressedImage;
            this.cacheUpdated.emit(this.photosCache);
          }, () => { }, () => { this.loading = false; });
      } else if (this.photos[this.index].mediaType == 'video') {
        this.mediaType = 'video';
        this.imgSrc = undefined;
        this.photoService.getVideoByTitle(this.photos[this.index].title, "").subscribe(s => {
          let a = new Blob([s], {type: 'video/mp4'});
          let url = URL.createObjectURL(a);
          this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.photosCache[this.index] = this.sanitizer.bypassSecurityTrustResourceUrl(url); 
          this.cacheUpdated.emit(this.photosCache); 
        }, () => { }, () => { this.loading = false; });
      }
    }
  }

  onOriginalImage() {
    this.loading = true;
    this.photoService
      .getPhotoById(this.photos[this.index].id, 'originalImage')
      .subscribe(photo => {
        const image = new Image();
        image.src = photo.base64OriginalImage;
        const w = window.open('about:blank', '_blank');
        w.document.write(image.outerHTML);
        // w.document.write('<iframe src="' + image.src + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:' + photo.mediaItemMetaData.width + '; height:' + photo.mediaItemMetaData.height

      }, () => { }, () => { this.loading = false; });

  }

  onDelete() {
    this.photoService
      .deletePhoto(this.photos[this.index].id)
      .subscribe(photo => {
        this.photos.splice(this.index, 1);
        delete this.photosCache[this.index];
        this.cacheUpdated.emit(this.photosCache);
        this.close();
      });
  }

  updatePhotoDescription() {
    this.photoService
      .patchPhotos([this.photos[this.index]]).subscribe(result => {
        console.log('patched photo' + result);
      }, () => { this.loading = false; }, () => { this.loading = false; });
  }

  showButtons() {
    this.showPrevious = this.index <= 0 ? false : true;
    this.showNext = this.index + 1 >= this.numOfImages ? false : true;
  }

  close() {
    this.closeModal.emit();
  }

  addToAlbum() {
    console.log('add to album');
    this.ngModelDir.control.markAsTouched();
    const modalRef = this.modalService.open(AddAlbumModalComponent, { centered: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.albumId = null;
    modalRef.componentInstance.photoIds = [this.photos[this.index].id];
    modalRef.componentInstance.closeModal.subscribe(onDelete => {
      modalRef.close();
    }); 
  }
}
