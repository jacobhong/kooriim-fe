export function kcFactory(keycloakService: KeycloakService) {
  return () => keycloakService.init();
}
import { AuthGuardService } from './shared/guards/auth-guard/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PhotoGalleryComponent } from './photo/photo-gallery/photo-gallery.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Interceptor } from './shared/interceptor/http-interceptor';
import { environment } from '../environments/environment';
import { PhotoModalComponent } from './photo/photo-modal/photo-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { AlbumCreateModalComponent } from './album/album-create-modal/album-create-modal.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlbumViewComponent } from './album/album-view/album-view.component';
import { LoginComponent } from './login/login.component';
import { KeycloakService } from './shared/keycloak/keycloak.service';
import { HomeComponent } from './home/home.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteScrollingComponent } from './shared/infinite-scroll/infinite-scroll.component';
import { PublicGalleryComponent } from './photo/public-gallery/public-gallery.component';
import { GoogleSyncComponent } from './google-sync/google-sync.component';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: environment.routes.fileUpload,
  maxFilesize: 50,
  timeout: 500000,
  acceptedFiles: 'image/*, .MP4, .mp4, .3pg, .MOV, .mov, .WMV, .wmv, .MKV, .mkv, .AVI, .avi',
  headers: {
    'Access-Control-Allow-Origin': environment.routes.baseUrl,
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
    InfiniteScrollingComponent,
    LoginComponent,
    HomeComponent,
    SpinnerComponent,
    PublicGalleryComponent,
    GoogleSyncComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DropzoneModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule, MatFormFieldModule, MatProgressSpinnerModule,
    NgbModule,
    MatCheckboxModule,
    MatIconModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    ReactiveFormsModule
  ],
  providers:
    [
      SpinnerComponent,
      InfiniteScrollingComponent,
      {
        provide: DROPZONE_CONFIG,
        useValue: DEFAULT_DROPZONE_CONFIG
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
      },
      KeycloakService, {
        provide: APP_INITIALIZER,
        useFactory: kcFactory,
        deps: [KeycloakService],
        multi: true
      }
    ],
  entryComponents: [AlbumCreateModalComponent, PhotoModalComponent, SpinnerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
