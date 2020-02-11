import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';
import { environment } from 'src/environments/environment';
declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() { }

  keycloakAuth: KeycloakInstance;
  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        url: environment.routes.keycloak,
        realm: 'kooriim',
        clientId: 'kooriim-fe'
      };
      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          console.log('sucess k');
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  getToken(): string {
    console.log('token');
    console.log(this.keycloakAuth);
    return this.keycloakAuth.token;
  }
}
