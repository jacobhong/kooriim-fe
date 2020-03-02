import { Photo, Album } from '../../shared/model/model';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceComponent {

  constructor(private httpClient: HttpClient) { }



  addPhotoIdsToAlbum(albumId: number, ids: any): Observable<any> {
    return this.httpClient
      .patch<any[]>(environment.routes.albums + '/' + albumId, ids)
      .pipe(catchError(error => throwError(error)));
  }

  getPhotoById(photoId: number): Observable<Photo> {
    return this.httpClient.get<Photo>(environment.routes.photo + '/' + photoId, { params: new HttpParams().set('srcImage', 'true') });
  }

  getPhotos(queryParams?: Map<string, string>): Observable<Photo[]> {
    let httpParams = new HttpParams();
    if (queryParams) {
      queryParams.forEach((v, k) => {
        httpParams = httpParams.append(k, v);
      });
    }
    return this.httpClient.get<Photo[]>(environment.routes.photo, { params: httpParams });
  }

  getPhotosByAlbumId(albumId: string): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(environment.routes.photo, { params: new HttpParams().set('albumId', albumId).append('thumbnail', 'true') });
  }

  deletePhoto(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.routes.photo + '/' + id);
  }

  deletePhotos(ids: any): Observable<any> {
    return this.httpClient.delete<any>(environment.routes.photo, { params: new HttpParams().set('photoIds', ids) });
  }
}
