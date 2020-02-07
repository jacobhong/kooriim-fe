import { AlbumViewComponent } from './album-view/album-view.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'albums', component: AlbumViewComponent },
  { path: 'file-upload', component: FileUploadComponent },
  { path: 'login', component: LoginComponent },
  { path: 'photo-gallery', component: PhotoGalleryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
;