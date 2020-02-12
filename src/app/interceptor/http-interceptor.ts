import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from '../keycloak/keycloak.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        private kcService: KeycloakService,
        @Inject('BASE_API_URL') private baseUrl: string,
        @Inject('BASE_CONTEXT') private baseContext: string) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let apiReq;
        let r = new HttpHeaders();
        r = r.append('Authorization', 'Bearer ' + this.kcService.getToken() || '');
        // r.append('X-Requested-With', 'XMLHttpRequest');
        // r = r.append('Access-Control-Allow-Origin', '*');
        // r = r.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, "OPTIONS');
        // r = r.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept');
        apiReq = req.clone({ headers: r, url: `${this.baseUrl}${this.baseContext}/${req.url}` });
        if (req.url.indexOf('photo-album-service') !== -1) {
            console.log('route to photo prod');
            apiReq = req.clone({ headers: r, url: `${environment.routes.baseUrl}/${req.url}` });
            console.log(apiReq);
        }
        if (req.url.indexOf('auth') !== -1) {
            console.log('route to keycloak');
            apiReq = req.clone({ headers: r, url: `${environment.routes.auth}/${req.url}` });
        } console.log(apiReq);
        return next.handle(apiReq);
    }
}