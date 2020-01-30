import { Photo, Album } from '../../model/model';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { routes } from 'src/app/environment-dev';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceComponent {

  constructor(private httpClient: HttpClient) { }

  createAlbum(album: Album): Observable<any> {
    return this.httpClient
      .post<any[]>(routes.albums, album)
      .pipe(catchError(error => throwError(error)));
  }

  getPhotoById(photoId: number): Observable<Photo> {
    return this.httpClient.get<Photo>(routes.photo + '/' + photoId, {params: new HttpParams().set('srcImage', 'true')});
  }

  getPhotos(queryParams?: Map<string, string>): Observable<Photo[]> {
    let httpParams = new HttpParams();
    if (queryParams) {
      queryParams.forEach((v, k) => {
        httpParams = httpParams.append(k, v);
      });
    }
    return this.httpClient.get<Photo[]>(routes.photo, {params: httpParams});
  }

  getPhotosByAlbumId(albumId: string): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(routes.photo, { params: new HttpParams().set('albumId', albumId).append('thumbnail', 'true') });
  }

  deletePhoto(id: number): Observable<any> {
    return this.httpClient.delete<any>(routes.photo + '/' + id);
  }

  deletePhotos(ids: any): Observable<any> {
    return this.httpClient.delete<any>(routes.photo, { params: new HttpParams().set('photoIds', ids) });
  }
}
