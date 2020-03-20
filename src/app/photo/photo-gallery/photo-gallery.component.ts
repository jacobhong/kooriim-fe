import { SpinnerComponent } from './../../shared/spinner/spinner.component';
import { AlbumCreateModalComponent } from '../../album/album-create-modal/album-create-modal.component';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PhotoServiceComponent } from '../photo-service/photo-service.component';
import { Photo, Pageable } from '../../shared/model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { AlbumServiceComponent } from 'src/app/album/album-service/album-service.component';
import { InfiniteScrollingComponent } from 'src/app/shared/infinite-scroll/infinite-scroll.component';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  @ViewChild(InfiniteScrollingComponent, null) infiniteScroll: InfiniteScrollingComponent;
  albumTitle: string;
  albumId: number;
  photos: Photo[];
  photosInAlbum: number[];
  photosCache: {};
  isEditMode: boolean;
  addAlbumMode: boolean;
  isSmallScreen: boolean;
  publicView: boolean;
  loading = false;
  pageable: Pageable;
  queryParams: Map<string, string>;
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
    this.addAlbumMode = false;
    this.publicView = false;
    this.photosInAlbum = [];
    this.isSmallScreen = window.innerWidth <= 700 ? true : false;
    this.pageable = new Pageable();
    this.queryParams = new Map<string, string>();

  }

  ngOnInit() {
    console.log('||||||||||||||');
    this.loading = true;
    this.pageable.size = 10;
    this.pageable.page = 0;
    if (this.isSmallScreen) {
      this.queryParams.set('srcImage', 'true');
    } else {
      this.queryParams.set('thumbnail', 'true');
    }
    this.queryParams.set('size', this.pageable.size + '');
    this.queryParams.set('page', this.pageable.page + '');
    this.route.queryParams.subscribe(params => {
      if (params.publicView) {
        this.publicView = true;
        this.queryParams.set('publicView', 'true');
      }
      if (params.title) {
        this.albumTitle = params.title;
      }
      if (params.albumId) {
        this.albumId = params.albumId;
      }
      if (params && params.albumId && !params.addAlbumMode) {
        console.log('not album modee');
        this.queryParams.set('albumId', params.albumId);
        this.getPhotos();
      } else {
        if (params.addAlbumMode) {
          console.log('album mode');
          console.log(this.queryParams);;
          this.getPhotosInAlbum();
        }
        this.queryParams.delete('albumId');
        this.getPhotos();
      }
      this.infiniteScroll.scrolled.subscribe(result => {
        this.loading = true;
        this.onScroll();
      });
    });
  }

  getPhotos() {
    this.photoService.getPhotos(this.queryParams)
      .subscribe(result => {
        this.photos = result;
        if (this.addAlbumMode) {
          if (this.photosInAlbum.length > 0) {
            this.photos.forEach(p => {
              if (this.photosInAlbum.indexOf(p.id) !== -1) {
                p.selected = true;
              }
            });
          }
        }
      }, () => { this.loading = false; }, () => { this.loading = false; })
  }

  /**
   * get photos already in album
   */
  getPhotosInAlbum() {
    this.addAlbumMode = true;
    this.queryParams.set('albumId', this.albumId + '');
    this.photoService.getPhotos(this.queryParams)
      .subscribe(result => {
        result.forEach(p => {
          this.photosInAlbum.push(p.id);
        });
      }, () => { this.loading = false; }, () => { this.loading = false; });
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
    if (!this.isSmallScreen && !this.addAlbumMode) {
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

  makePublic() {
    const ids = this.photos.filter(photo => photo.selected).map(photo => photo.id);
    
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

  onScroll() {
    this.pageable.page++;
    this.queryParams.set('page', this.pageable.page + '');
    this.photoService
      .getPhotos(this.queryParams)
      .subscribe(scrollResult => {
        this.photos.push.apply(this.photos, scrollResult);
        if (this.photosInAlbum.length > 0) {
          this.photos.forEach(p => {
            if (this.photosInAlbum.indexOf(p.id) !== -1) {
              p.selected = true;
            }
          });
        }
      }, () => { this.loading = false; }, () => { this.loading = false; });
  }
}
