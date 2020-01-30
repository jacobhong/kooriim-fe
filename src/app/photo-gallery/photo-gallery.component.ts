import { AlbumCreateModalComponent } from './../shared/modals/album-create-modal/album-create-modal.component';
import { PhotoModalComponent } from '../shared/modals/photo-modal/photo-modal.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhotoServiceComponent } from './photo-service/photo-service.component';
import { Photo } from '../model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumServiceComponent } from '../album-view/album-service/album-service.component';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  photos: Photo[];
  photosCache: {};
  isEditMode: boolean;

  constructor(
    private albumService: AlbumServiceComponent,
    private photoService: PhotoServiceComponent,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isEditMode = false;
    this.route.queryParams.subscribe(params => {
      if (params && params.albumId) {
        this.photoService.getPhotosByAlbumId(params.albumId)
          .subscribe(result => {
            this.photos = result;
          });
      } else {
        const queryParams = new Map<string, string>();
        queryParams.set('thumbnail', 'true');
        this.photoService
          .getPhotos(queryParams)
          .subscribe(result => {
            this.photos = result;
          });
      }
    });
  }

  createAlbum() {
    const modalRef = this.modalService.open(AlbumCreateModalComponent, { centered: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.album.photoIds = this.photos.filter(p => p.selected).map(p => p.id);
    modalRef.componentInstance.submitted.subscribe(submit => {
      this.photos.forEach(p => p.selected = false);
      modalRef.close();
    }, error => {
      console.log(error);
    });
  }

  onEdit() {
    this.isEditMode = !this.isEditMode;
  }

  openModal(photo: Photo, index: number) {
    this.photoService
      .getPhotoById(photo.id)
      .subscribe(result => {
        this.modalSubscriptions(result.base64SrcPhoto, index);
      });
  }

  onSelect(index: number) {
    this.photos[index].selected = !this.photos[index].selected;
  }

  onSubmit() {
    console.log('submitting');
  }

  delete() {
    const ids = this.photos.filter(photo => photo.selected).map(photo => photo.id);
    console.log('deleting');
    console.log(ids);
    this.photoService.deletePhotos(ids).subscribe(result => {
      ids.forEach(id => {
        this.photos.splice(this.photos.findIndex(p => id === p.id), 1);
      });
    });
  }

  selectAll() {
    this.photos.forEach(p => p.selected = true);
  }

  modalSubscriptions(result: string, index: number) {
    const modalRef = this.modalService.open(PhotoModalComponent, { size: 'xl', centered: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.imgSrc = result;
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.numOfImages = this.photos.length;
    modalRef.componentInstance.photos = this.photos;
    modalRef.componentInstance.photosCache = this.photosCache !== undefined ? this.photosCache : {};
    modalRef.componentInstance.closeModal.subscribe(onDelete => {
      modalRef.close();
    });
    modalRef.componentInstance.cacheUpdated.subscribe(cache => {
      this.photosCache = cache;
    });
  }
}
