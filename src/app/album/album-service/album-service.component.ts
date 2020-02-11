import { Album, Photo } from 'src/app/model/model';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumServiceComponent {
  constructor(private httpClient: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.httpClient
      .get<Album[]>(environment.routes.albums)
      .pipe(catchError(error => throwError(error)));
  }

  // getThumbnails(): Observable<Photo[]> {
  //   return this.httpClient.get<Photo[]>(routes.thumbnails);
  // }

  // deletePhoto(id: number): Observable<any> {
  //   return this.httpClient.delete<any>(routes.photo + '/' + id);
  // }

  // getBase64SrcImage(filePath: string): Observable<string> {
  //   return this.httpClient.get(routes.image, { responseType: 'text', params: new HttpParams().set('filePath', filePath) });
  // }
}
