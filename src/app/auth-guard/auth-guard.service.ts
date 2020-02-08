import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { KeycloakService } from '../keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private keyCloak: KeycloakService) {
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.keyCloak.keycloakAuth);
    return this.keyCloak.keycloakAuth.authenticated === true &&
     this.keyCloak.keycloakAuth.realmAccess.roles.indexOf(route.data.role) !== -1;
  }

}