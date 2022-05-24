import { SpinnerComponent } from './../../shared/spinner/spinner.component';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PhotoServiceComponent } from '../photo-service/photo-service.component';
import { Photo, Pageable } from '../../shared/model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { AlbumServiceComponent } from 'src/app/album/album-service/album-service.component';
import { InfiniteScrollingComponent } from 'src/app/shared/infinite-scroll/infinite-scroll.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AddAlbumModalComponent } from '../add-album-modal/add-album-modal.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  @ViewChild(InfiniteScrollingComponent, {static: true})
   infiniteScroll: InfiniteScrollingComponent;
  // @Input()
  // publicView: boolean;
  albumTitle: string;
  albumId: number;
  photos: Photo[];
  photosInAlbum: number[];
  photosCache: {};
  isEditMode: boolean;
  addAlbumMode: boolean;
  isSmallScreen: boolean;
  loading = false;
  pageable: Pageable;
  queryParams: Map<string, string>;
  scrollPosition;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isSmallScreen = event.target.innerWidth <= 700 ? true : false;
  }
// @HostListener('document:scroll', ['$event'])
  onScroll() {
    console.log('scrolltop' + document.documentElement.scrollTop);
    let currentScrollPosition = document.documentElement.scrollTop;
    console.log('currentScrollPosition' + currentScrollPosition);

    if (currentScrollPosition > this.scrollPosition) {
      console.log('scrolling now');
      this.loading = true;
      this.scroll();
    }
    this.scrollPosition = currentScrollPosition;
  }
  constructor(
    private albumService: AlbumServiceComponent,
    private photoService: PhotoServiceComponent,
    private modalService: NgbModal,
    private ngModelDir: NgModel,
    private sanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry,
    private platform: Platform,

    private route: ActivatedRoute, private spinner: SpinnerComponent, private router: Router
  ) {
    this.albumTitle = '';
    this.isEditMode = false;
    this.addAlbumMode = false;
    this.photosInAlbum = [];
    this.photos = [];
    this.isSmallScreen = window.innerWidth <= 700 ? true : false;
    this.pageable = new Pageable();
    this.queryParams = new Map<string, string>();
    iconRegistry.addSvgIcon(
      'play_circle_outline',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/play_circle_outline-24px.svg'));
  }

  ngOnInit() {
    this.loading = true;
    this.pageable.size = 20;
    this.pageable.page = 0;
    this.queryParams.set('size', this.pageable.size + '');
    this.queryParams.set('page', this.pageable.page + '');
    if (this.isSmallScreen) {
      console.log('small screen yo');
      this.queryParams.set('compressedImage', 'true');
    } else {
      this.queryParams.set('thumbnail', 'true');
    }
    // if (this.publicView) {
    //   this.queryParams.set('publicView', 'true');
    //   this.getPublicGallery();
    //   return;
    // }
    this.route.queryParams.subscribe(params => {
      if (params.title) {
        this.albumTitle = params.title;
      }
      if (params.albumId) {
        this.albumId = params.albumId;
        this.queryParams.set('albumId', params.albumId);
        if (params.addAlbumMode) {
          console.log('get album');
          this.getPhotosInAlbum();
        } else {
          // this.queryParams.delete('albumId');
          this.getPhotos();
        }
      } else {
        this.getPhotos();
      }
      console.log('scroller ' + this.infiniteScroll);
      this.infiniteScroll.scrolled.subscribe(result => {
        this.loading = true;
        this.scroll();
      });
      this.scroll();
    });
  }

  getPhotos() {
    this.photoService.getPhotos(this.queryParams)
      .subscribe(result => {
        this.photos = result;
        if (this.addAlbumMode) {
          console.log('is album');
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

  // getPublicGallery() {
  //   this.photoService.getPublicGallery(this.queryParams)
  //     .subscribe(result => {
  //       this.photos = result;
  //     }, () => { this.loading = false; }, () => { this.loading = false; })
  // }

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
        this.queryParams.delete('albumId');
        this.getPhotos();
      }, () => { this.loading = false; }, () => { this.loading = false; });
  }

  onEdit() {
    this.isEditMode = !this.isEditMode;
    // if (!this.addAlbumMode) {
    //   this.photos.filter(p => p.isPublic).map(p => p.selected = true);
    // }
  }

  addPhotoIdsToAlbum() {
    const photoIds = this.photos.filter(p => p.selected).map(p => p.id);
    this.photoService.addPhotoIdsToAlbum(this.albumId, photoIds).subscribe(result => {
      this.router.navigate(['albums']);
    });
  }

  openModal(photo: Photo, index: number) {
    if (!this.isEditMode && !this.addAlbumMode) {
      this.loading = true;
      if (photo.mediaType == 'photo') {
        this.photoService
          .getPhotoById(photo.id, 'compressedImage')
          .subscribe(result => {
            this.modalSubscriptions(result, index);
          }, () => { this.loading = false; }, () => { this.loading = false; });
      } else if (photo.mediaType == 'video') {
        this.photoService.getVideoByTitle(photo.title, "").subscribe(result => {
          let a = new Blob([result], { type: 'video/mp4' });
          let url = URL.createObjectURL(a);
          photo.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.modalSubscriptions(photo, index);
        }, () => { }, () => { this.loading = false; });
      }
    } else {
     this.onSelect(index);
    }
  }

  playVideoMobile(photo: Photo, index: number) {
    this.loading = true;
    if (photo.mediaType == 'video') {
      this.photoService.getVideoByTitle(photo.title, "").subscribe(result => {
        let a = new Blob([result], { type: 'video/mp4' });
        let url = URL.createObjectURL(a);
        photo.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.modalSubscriptions(photo, index);
      }, () => { }, () => { this.loading = false; });
    }
  }

  onSelect(index: number) {
    this.photos[index].selected = !this.photos[index].selected;
  }

  onSubmit() {
    console.log('submitting');
  }

  // makePublic() {
  //   this.loading = true;
  //   const photos = this.photos.filter(photo => photo.selected);
  //   photos.forEach(photo => {
  //     photo.isPublic = true;
  //   });
  //   this.photoService.patchPhotos(photos).subscribe(result => {
  //     console.log(result);
  //   }, () => { this.loading = false; }, () => { this.loading = false; });
  // }

  // hide() {
  //   this.loading = true;
  //   const photos = this.photos.filter(photo => photo.selected);
  //   photos.forEach(photo => {
  //     photo.isPublic = false;
  //   });
  //   this.photoService.patchPhotos(photos).subscribe(result => {
  //     console.log(result);
  //     this.photos.filter(photo => photo.selected).map(photo => photo.selected = false);
  //   }, () => { this.loading = false; }, () => { this.loading = false; });
  // }

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

  sort() {
    this.photos.reverse();
  }

  moveToAlbum() {
    this.ngModelDir.control.markAsTouched();
    const modalRef = this.modalService.open(AddAlbumModalComponent, { centered: true, windowClass: 'dark-modal' });
    modalRef.componentInstance.albumId = this.albumId;
    modalRef.componentInstance.photoIds = this.photos.filter(p => p.selected).map(p => p.id);
    modalRef.componentInstance.closeModal.subscribe(onDelete => {
      modalRef.close();
    }); 
  }

  modalSubscriptions(result: Photo, index: number) {
    // this.ngModelDir.control.markAsTouched();
    const modalRef = this.modalService.open(PhotoModalComponent, { size: 'xl', centered: true, windowClass: 'photo-modal' });
    if (result.mediaType == 'photo') {
      modalRef.componentInstance.imgSrc = result.base64CompressedImage;
    } else {
      modalRef.componentInstance.videoSrc = result.videoSrc;
    }
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.mediaType = result.mediaType;
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

  scroll() {
    console.log('gwergrweiogjeriowgjaroiwgjarewgiojaegjoraegjaeorigjar');
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

  // playVideo(photo: Photo) {
  //   this.loading = true;
  //   this.photoService.getVideoByTitle(photo.title, "").subscribe(s => {
  //     let a = new Blob([s], { type: 'video/mp4' });
  //     let url = URL.createObjectURL(a);
  //     photo.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //   }, () => { }, () => { this.loading = false; });
  // }

}


