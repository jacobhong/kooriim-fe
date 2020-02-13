import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { KeycloakService } from '../../keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private keyCloak: KeycloakService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.keyCloak.keycloak.authenticated === true &&
      this.keyCloak.keycloak.realmAccess.roles.indexOf(route.data.role) !== -1) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}