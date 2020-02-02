import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Interceptor } from './interceptor/http-interceptor';
import { routes } from './environment-dev';
import { PhotoModalComponent } from './shared/modals/photo-modal/photo-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlbumCreateModalComponent } from './shared/modals/album-create-modal/album-create-modal.component';
import { FormsModule } from '@angular/forms';
import { AlbumViewComponent } from './album-view/album-view.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'http://192.168.1.206:4200/web-app/photos',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PhotoGalleryComponent,
    FileUploadComponent,
    PhotoModalComponent,
    AlbumCreateModalComponent,
    AlbumViewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DropzoneModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    NgbModule,
    MatCheckboxModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers:
    [
      {
        provide: DROPZONE_CONFIG,
        useValue: DEFAULT_DROPZONE_CONFIG
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
      },
      {
        provide: 'BASE_API_URL',
        useValue: routes.baseUrl
      },
      {
        provide: 'BASE_CONTEXT',
        useValue: routes.baseContext
      }
    ],
  entryComponents: [AlbumCreateModalComponent, PhotoModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
