import { AlbumViewComponent } from './album-view/album-view.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/#',
    pathMatch: 'full'
  },
  {
    path: 'albums',
    component: AlbumViewComponent,
    canActivate: [AuthGuardService],
    data: { role: 'kooriim-fe' }
  },
  {
    path: 'file-upload',
    component: FileUploadComponent,
    canActivate: [AuthGuardService],
    data: { role: 'kooriim-fe' }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'photo-gallery',
    component: PhotoGalleryComponent,
    canActivate: [AuthGuardService],
    data: { role: 'kooriim-fe' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
;