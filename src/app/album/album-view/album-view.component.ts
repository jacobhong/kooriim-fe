import { Component, HostListener, OnInit } from '@angular/core';
import { Album, Pageable } from '../../shared/model/model';
import { AlbumServiceComponent } from '../album-service/album-service.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoServiceComponent } from 'src/app/photo/photo-service/photo-service.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlbumCreateModalComponent } from '../album-create-modal/album-create-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss']
})
export class AlbumViewComponent implements OnInit {
  albums: Album[];
  pageable: Pageable;
  loading = false;
  queryParams: Map<string, string>;
  scrollPosition;
  constructor(
    private albumService: AlbumServiceComponent,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private photoService: PhotoServiceComponent,
    private modalService: NgbModal, private router: Router
  ) {
    this.albums = [];
    this.pageable = new Pageable();
    this.queryParams = new Map<string, string>();
    iconRegistry.addSvgIcon(
      'add_photo_to_album',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/add_a_photo-24px.svg'));
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/edit-24px.svg'))
  }

  @HostListener('document:scroll')
  onScroll() {
    console.log('scroll' + document.documentElement.scrollTop);
    let currentScrollPosition = document.documentElement.scrollTop;
    if (currentScrollPosition > this.scrollPosition) {
      console.log('scrolling');
      this.loading = true;
      this.scroll();
    }
    this.scrollPosition = currentScrollPosition;
  }

  ngOnInit() {
    this.pageable.size = 20;
    this.pageable.page = 0;
    this.queryParams.set('size', this.pageable.size + '');
    this.queryParams.set('page', this.pageable.page + '');
    this.albumService
      .getAlbums(this.queryParams)
      .subscribe(albums => {
        albums.forEach(a => this.albums.push(a));
      }, () => { this.loading = false; }, () => { this.loading = false; });
  }

  scroll() {
    this.pageable.page++;
    this.queryParams.set('page', this.pageable.page + '');
    this.albumService
      .getAlbums(this.queryParams)
      .subscribe(albums => {
        albums.forEach(a => this.albums.push(a));
      }, () => { this.loading = false; }, () => { this.loading = false; });
  }

  addPhotoToAlbum(id: string, albumTitle: string) {
    this.router.navigate(['photo-gallery'], { queryParams: { albumId: this.albums[id].id, addAlbumMode: true, title: albumTitle } });
  }

  createAlbum(album?: Album) {
    const modalRef = this.modalService.open(AlbumCreateModalComponent, { centered: true, windowClass: 'dark-modal' });
    // modalRef.componentInstance.album.photoIds = this.photos.filter(p => p.selected).map(p => p.id);
    if (album) {
      modalRef.componentInstance.album.id = album.id;
      modalRef.componentInstance.album.title = album.title;
      modalRef.componentInstance.album.description = album.description;
      modalRef.componentInstance.albumMode = 'Edit album';
    }

    modalRef.componentInstance.submitted.subscribe(submit => {
      // this.photos.forEach(p => p.selected = false);
      modalRef.close();
      // this.router.navigate(['albums']);
      location.reload();
    }, error => {
      console.log(error);
    });

    modalRef.componentInstance.deleted.subscribe(submit => {
      // this.photos.forEach(p => p.selected = false);
      modalRef.close();
      // this.router.navigate(['albums']);
      location.reload();
    }, error => {
      console.log(error);
    })
  }
}
