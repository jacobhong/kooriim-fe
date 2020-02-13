
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './shared/keycloak/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  title = 'fe-app';

  constructor(private keycloak: KeycloakService) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.isAuthenticated = this.keycloak.keycloak.authenticated;
  }
}