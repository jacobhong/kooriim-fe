import { Album, Photo } from 'src/app/shared/model/model';
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
  
  createAlbum(album: Album): Observable<any> {
    return this.httpClient
      .post<any[]>(environment.routes.albums, album)
      .pipe(catchError(error => throwError(error)));
  }

  getAlbums(): Observable<Album[]> {
    return this.httpClient
      .get<Album[]>(environment.routes.albums)
      .pipe(catchError(error => throwError(error)));
  }

  // getThumbnails(): Observable<Photo[]> {
  //   return this.httpClient.get<Photo[]>(routes.thumbnails);
  // }

  deleteAlbum(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.routes.albums + '/' + id);
  }

  // getBase64SrcImage(filePath: string): Observable<string> {
  //   return this.httpClient.get(routes.image, { responseType: 'text', params: new HttpParams().set('filePath', filePath) });
  // }
}
