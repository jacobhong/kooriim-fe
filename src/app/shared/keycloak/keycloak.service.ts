import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';
import { environment } from 'src/environments/environment';
declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() { }

  keycloak: KeycloakInstance;
  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        url: environment.routes.keycloak,
        realm: 'kooriim-fe',
        clientId: 'kooriim-fe'
      };
      this.keycloak = new Keycloak(config);
      this.keycloak.init(
        {
          onLoad: 'check-sso'
        }
      ).success((isLoggedin) => {
        resolve(null);
      }).error(() => {
        console.log('error');
        reject();
      });
    });
  }

  getToken(): string {
    console.log('token refreshing');
    this.keycloak.updateToken(255).success((refreshed) => {
      if (refreshed) {
        console.debug('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(this.keycloak.tokenParsed.exp + this.keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).error(() => {
      console.error('Failed to refresh token');
    });
    return this.keycloak.token;
  }
}
