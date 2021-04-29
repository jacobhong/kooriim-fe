import { Photo, Album } from '../../shared/model/model';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceComponent {

  constructor(private httpClient: HttpClient) { }

  refreshToken() {
    return this.httpClient.post<any>(environment.routes.refreshToken, {});  }

  addPhotoIdsToAlbum(albumId: number, ids: any): Observable<any> {
    return this.httpClient
      .patch<any[]>(environment.routes.albums + '/' + albumId, ids)
      .pipe(catchError(error => throwError(error)));
  }

  getPhotoById(photoId: number, imageType: string): Observable<Photo> {
    return this.httpClient.get<Photo>(environment.routes.photo + '/' + photoId, { params: new HttpParams().set(imageType, 'true') });
  }

  googleSync(): Observable<any> {
    return this.httpClient.post<any>(environment.routes.googleSync, {});
  }

  getVideoByTitle(title: string, imageType: string): Observable<ArrayBuffer> {
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/octet-stream',
        'Content-Type': 'application/octet-stream'
      })
    }; 
    
    return this.httpClient.get<ArrayBuffer>(environment.routes.video + '/' + title, options);
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

  // getPublicGallery(queryParams?: Map<string, string>): Observable<Photo[]> {
  //   let httpParams = new HttpParams();
  //   if (queryParams) {
  //     queryParams.forEach((v, k) => {
  //       httpParams = httpParams.append(k, v);
  //     });
  //   }
  //   return this.httpClient.get<Photo[]>(environment.routes.publicGallery, { params: httpParams });
  // }

  // getPhotosByAlbumId(albumId: string): Observable<Photo[]> {
  //   return this.httpClient.get<Photo[]>(environment.routes.photo, { params: new HttpParams().set('albumId', albumId).append('thumbnail', 'true') });
  // }

  deletePhoto(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.routes.photo + '/' + id);
  }

  deletePhotos(ids: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { ids: ids }
    };
    return this.httpClient.delete<any>(environment.routes.photo, options);
  }

  patchPhotos(photos: Photo[]): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { photos: photos }
    };
    return this.httpClient.patch<any>(environment.routes.photo, photos);
  }
}
