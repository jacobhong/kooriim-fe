import { AlbumCreateModalComponent } from './../shared/modals/album-create-modal/album-create-modal.component';
import { PhotoModalComponent } from '../shared/modals/photo-modal/photo-modal.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhotoServiceComponent } from './photo-service/photo-service.component';
import { Photo } from '../model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  photos: Photo[];
  isEditMode: boolean;
  constructor(private photoService: PhotoServiceComponent, private modalService: NgbModal) { }

  ngOnInit() {
    this.isEditMode = false;
    this.photoService
      .getThumbnails()
      .subscribe(result => {
        console.log('ngOnInit loaded photos');
        this.photos = result;
      });
  }

  createAlbum() {
    const modalRef = this.modalService.open(AlbumCreateModalComponent, { centered: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.album.photoIds = this.photos.filter(p => p.selected).map(p => p.id);
    modalRef.componentInstance.submitted.subscribe(submit => {
      console.log('submitted');
      modalRef.close();
    });
  }

  onEdit() {
    this.isEditMode = !this.isEditMode;
  }

  openModal(photo: Photo, index: number) {
    this.photoService
      .getBase64SrcImage(photo.filePath)
      .subscribe(result => {
        this.modalSubscriptions(result, index);
      });
  }

  onSelect(index: number) {
    this.photos[index].selected = !this.photos[index].selected;
  }

  onSubmit() {
    console.log('submitting');
  }

  modalSubscriptions(result: string, index: number) {
    const modalRef = this.modalService.open(PhotoModalComponent, { size: 'xl', centered: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.imgSrc = result;
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.numOfImages = this.photos.length;
    modalRef.componentInstance.next.subscribe(onNext => {
      console.log(onNext.index + 'next');
      this.photoService
        .getBase64SrcImage(this.photos[onNext.index].filePath)
        .subscribe(nextImage => {
          modalRef.componentInstance.imgSrc = nextImage;
        });
    });
    modalRef.componentInstance.previous.subscribe(onPrevious => {
      console.log(onPrevious.index + 'previous');
      this.photoService
        .getBase64SrcImage(this.photos[onPrevious.index].filePath)
        .subscribe(nextImage => {
          modalRef.componentInstance.imgSrc = nextImage;
        });
    });
    modalRef.componentInstance.delete.subscribe(onDelete => {
      this.photoService
        .deletePhoto(this.photos[index].id)
        .subscribe(nextImage => {
          console.log('deletd image');
          this.photos.splice(index, 1);
          modalRef.close();
        });
    });
  }
}
