import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { KeycloakService } from '../shared/keycloak/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string;
  constructor(private keycloak: KeycloakService) {}

  ngOnInit() {
    this.userName = (this.keycloak.keycloak.tokenParsed as any).name;
  }

}
