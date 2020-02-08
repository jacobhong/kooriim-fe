export function kcFactory(keycloakService: KeycloakService) {
  return () => keycloakService.init();
}
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef, APP_INITIALIZER } from '@angular/core';
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
import { environment } from '../environments/environment';
import { PhotoModalComponent } from './shared/modals/photo-modal/photo-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlbumCreateModalComponent } from './shared/modals/album-create-modal/album-create-modal.component';
import { FormsModule } from '@angular/forms';
import { AlbumViewComponent } from './album-view/album-view.component';
import { LoginComponent } from './login/login.component';
import { KeycloakService } from './keycloak/keycloak.service';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'http://192.168.1.206.xip.io:4200/photo-album-service/photos',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  headers: {
    'Access-Control-Allow-Origin': 'http://192.168.1.206.xip.io:4200',
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
    AlbumViewComponent,
    LoginComponent
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
        useValue: environment.routes.baseUrl
      },
      {
        provide: 'BASE_CONTEXT',
        useValue: environment.routes.baseContext
      },
      KeycloakService, {
        provide: APP_INITIALIZER,
        useFactory: kcFactory,
        deps: [KeycloakService],
        multi: true
      }
    ],
  entryComponents: [AlbumCreateModalComponent, PhotoModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
