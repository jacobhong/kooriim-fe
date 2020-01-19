import { AlbumServiceComponent } from './album-service/album-service.component';
import { Component, OnInit } from '@angular/core';
import { Album } from '../model/model';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss']
})
export class AlbumViewComponent implements OnInit {
  albums: Album[];
  constructor(private albumService: AlbumServiceComponent) { }

  ngOnInit() {
    this.albumService
    .getAlbums()
    .subscribe(albums => {
      console.log('Fetched all albums');
      console.log(albums);
      this.albums = albums;
    });
  }

}
