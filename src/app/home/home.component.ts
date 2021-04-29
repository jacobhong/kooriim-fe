import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoServiceComponent } from '../photo/photo-service/photo-service.component';
import { KeycloakService } from '../shared/keycloak/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string;
  constructor(private photoService: PhotoServiceComponent, private keycloak: KeycloakService) {}

  ngOnInit() {
    this.userName = (this.keycloak.keycloak.tokenParsed as any).name;
    this.photoService.refreshToken().subscribe(d => {

    });
  }

}
