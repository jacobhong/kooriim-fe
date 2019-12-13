import { Photo } from './../../model/file';
import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { routes } from 'src/app/environment-dev';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceComponent {

  constructor(private httpClient: HttpClient) { }

  getPhotos(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(routes.photo);
  }

}
