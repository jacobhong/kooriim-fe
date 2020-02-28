import { SpinnerComponent } from './../../shared/spinner/spinner.component';
import { AlbumCreateModalComponent } from '../../album/album-create-modal/album-create-modal.component';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PhotoServiceComponent } from '../photo-service/photo-service.component';
import { Photo } from '../../shared/model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { AlbumServiceComponent } from 'src/app/album/album-service/album-service.component';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  albumTitle: string;
  albumId: number;
  photos: Photo[];
  photosInAlbum: Photo[];
  photosCache: {};
  isEditMode: boolean;
  isAlbumMode: boolean;
  isSmallScreen: boolean;
  loading = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isSmallScreen = event.target.innerWidth <= 700 ? true : false;
  }

  constructor(
    private albumService: AlbumServiceComponent,
    private photoService: PhotoServiceComponent,
    private modalService: NgbModal,
    private platform: Platform,
    private route: ActivatedRoute, private spinner: SpinnerComponent, private router: Router
  ) {
    this.albumTitle = '';
    this.isEditMode = false;
    this.isAlbumMode = false;
    this.isSmallScreen = window.innerWidth <= 700 ? true : false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.title) {
        console.log(params.title);
        this.albumTitle = params.title;
      }
      this.albumId = params.albumId;
      console.log('album fucking id');
      console.log(this.albumId);
      if (params && params.albumId && !params.isAlbumMode) {
        console.log('FUCK');
        console.log('albumid:' + this.albumId);
        this.photoService.getPhotosByAlbumId(params.albumId)
          .subscribe(result => {
            this.photos = result;
          });
      } else {
        this.loading = true;
        const photosInAlbum = [];
        if (params.isAlbumMode) {
          console.log('edit true');
          this.isAlbumMode = !this.isAlbumMode;
          this.photoService.getPhotosByAlbumId(params.albumId)
            .subscribe(result => {
              result.forEach(p => {
                photosInAlbum.push(p.id);
              });
            });
        }
        const queryParams = new Map<string, string>();
        if (this.isSmallScreen) {
          queryParams.set('srcImage', 'true');
        } else {
          queryParams.set('thumbnail', 'true');
        }
        this.photoService
          .getPhotos(queryParams)
          .subscribe(result => {
            this.photos = result;
            if (photosInAlbum.length > 0) {
              this.photos.forEach(p => {
                if (photosInAlbum.indexOf(p.id) !== -1) {
                  p.selected = true;
                }
              });
            }
          }, () => { this.loading = false; }, () => { this.loading = false; });
      }
    });
  }

  onEdit() {
    this.isEditMode = !this.isEditMode;
  }

  addPhotoIdsToAlbum() {
    const photoIds = this.photos.filter(p => p.selected).map(p => p.id);
    this.photoService.addPhotoIdsToAlbum(this.albumId, photoIds).subscribe(result => {
      this.router.navigate(['albums']);
    });
  }

  openModal(photo: Photo, index: number) {
    if (!this.isSmallScreen && !this.isAlbumMode) {
      this.loading = true;
      this.photoService
        .getPhotoById(photo.id)
        .subscribe(result => {
          this.modalSubscriptions(result.base64SrcPhoto, index);
        }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }

  onSelect(index: number) {
    this.photos[index].selected = !this.photos[index].selected;
  }

  onSubmit() {
    console.log('submitting');
  }

  delete() {
    const ids = this.photos.filter(photo => photo.selected).map(photo => photo.id);
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

  deselectAll() {
    this.photos.forEach(p => p.selected = false);
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
