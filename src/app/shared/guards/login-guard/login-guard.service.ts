import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { KeycloakService } from '../../keycloak/keycloak.service';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private keyCloak: KeycloakService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.keyCloak.keycloak.authenticated === true) {
      this.router.navigate(['home']);
    } else {
      return true;
    }
  }

}
