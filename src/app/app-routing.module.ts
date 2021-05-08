import { PublicGalleryComponent } from './photo/public-gallery/public-gallery.component';
import { LoginGuardService } from './shared/guards/login-guard/login-guard.service';
import { HomeComponent } from './home/home.component';
import { AlbumViewComponent } from './album/album-view/album-view.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoGalleryComponent } from './photo/photo-gallery/photo-gallery.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/guards/auth-guard/auth-guard.service';
import { PublicGalleryGuardService } from './shared/guards/public-gallery-guard/public-gallery-guard.service';
import { GoogleSyncComponent } from './google-sync/google-sync.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'albums',
    component: AlbumViewComponent,
    canActivate: [AuthGuardService],
    data: { role: 'kooriim-fe' }
  },
  {
    path: 'home',
    component: HomeComponent,
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
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'photo-gallery',
    component: PhotoGalleryComponent,
    canActivate: [AuthGuardService],
    data: { role: 'kooriim-fe' }
  },
  {
    path: 'public-gallery',
    component: PublicGalleryComponent,
    canActivate: [PublicGalleryGuardService]
  },
  {
    path: 'google-sync',
    component: GoogleSyncComponent,
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