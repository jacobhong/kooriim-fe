import { KeycloakService } from '../shared/keycloak/keycloak.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName: string;
  constructor(private keycloak: KeycloakService) {
    this.userName = '';
  }

  ngOnInit() {
    this.userName = (this.keycloak.keycloak.tokenParsed as any).name;
  }

  onClick() {
    console.log('logging out');
    this.keycloak.keycloak.logout();
  }
}
