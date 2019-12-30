import { PhotoModalComponent } from './photo-modal/photo-modal.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhotoServiceComponent } from './photo-service/photo-service.component';
import { Photo } from '../model/file';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  photos: Photo[];

  constructor(private photoService: PhotoServiceComponent, private modalService: NgbModal) { }

  ngOnInit() {
    this.photoService
      .getThumbnails()
      .subscribe(result => {
        console.log('ngOnInit loaded photos');
        this.photos = result;
      });
  }

  openModal(photo: Photo, index: number) {
    this.photoService
      .getBase64SrcImage(photo.filePath)
      .subscribe(result => {
        this.modalSubscriptions(result, index);
      });
  }

  modalSubscriptions(result: string, index: number) {
    const modalRef = this.modalService.open(PhotoModalComponent, { size: 'xl', centered: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.imgSrc = result;
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.numOfImages = this.photos.length;
    modalRef.componentInstance.next.subscribe(onNext => {
      this.photoService
        .getBase64SrcImage(this.photos[onNext.index].filePath)
        .subscribe(nextImage => {
          modalRef.componentInstance.imgSrc = nextImage;
        });
    });
    modalRef.componentInstance.previous.subscribe(onPrevious => {
      this.photoService
        .getBase64SrcImage(this.photos[onPrevious.index].filePath)
        .subscribe(nextImage => {
          modalRef.componentInstance.imgSrc = nextImage;
        });
    });
  }
}
