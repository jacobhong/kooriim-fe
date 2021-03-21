import { SpinnerComponent } from './../spinner/spinner.component';
import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from '../keycloak/keycloak.service';
import { environment } from 'src/environments/environment';
import { tap, finalize } from 'rxjs/operators';


@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        private keycloak: KeycloakService, private spinner: SpinnerComponent) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let apiReq;
        if (req.url.indexOf('public-gallery') !== -1) {
            apiReq = req.clone({ url: `${environment.routes.baseUrl}/${req.url}` });
        } else {
            let r = new HttpHeaders();
            // req.headers.set('Authorization', 'Bearer ' + this.keycloak.getToken() || '');
            if (req.url.indexOf('auth') !== -1) {
                apiReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.keycloak.getToken() || ''), url: `${environment.routes.auth}/${req.url}` });
            } else if (req.url.indexOf('assets') !== -1) {
                apiReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.keycloak.getToken() || ''), url: `${environment.routes.assets}/${req.url}` });
            }  else if (req.url.indexOf('videos') !== -1) {
                apiReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.keycloak.getToken() || ''), responseType: 'blob', url: `${environment.routes.baseUrl}/${req.url}` });
            } else {
                apiReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.keycloak.getToken() || ''), url: `${environment.routes.baseUrl}/${req.url}` });
            }
        }
        return next.handle(apiReq).pipe(tap(
        ), finalize(() => {
        })
        );
    }
}