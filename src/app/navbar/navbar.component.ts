import { KeycloakService } from '../shared/keycloak/keycloak.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName: string;
  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private keycloak: KeycloakService,
    private router: Router) {
    this.userName = '';
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/home-24px.svg'));
    iconRegistry.addSvgIcon(
      'add_photo',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/add_a_photo-24px.svg'));
    iconRegistry.addSvgIcon(
      'photo',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/photo-24px.svg'));
    iconRegistry.addSvgIcon(
      'photo_library',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/mat-icons/photo_library-24px.svg'));
  }

  ngOnInit() {
    this.userName = (this.keycloak.keycloak.tokenParsed as any).name;
  }

  onClick() {
    this.keycloak.keycloak.logout();
  }

  navigatePublicPhotos() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['public-gallery']));
  }
}
