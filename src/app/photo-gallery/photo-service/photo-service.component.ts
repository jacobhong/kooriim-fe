import { Photo, Album } from '../../model/model';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { routes } from 'src/app/environment-dev';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceComponent {

  constructor(private httpClient: HttpClient) { }

  createAlbum(album: Album): Observable<any> {
    return this.httpClient.post<any[]>(routes.albums, album);
  }

  getThumbnails(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(routes.thumbnails);
  }

  deletePhoto(id: number): Observable<any> {
    return this.httpClient.delete<any>(routes.photo + '/' + id);
  }

  getBase64SrcImage(filePath: string): Observable<string> {
    return this.httpClient.get(routes.image, { responseType: 'text', params: new HttpParams().set('filePath', filePath) });
  }
}
