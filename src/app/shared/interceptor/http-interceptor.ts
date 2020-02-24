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
        let r = new HttpHeaders();
        r = r.append('Authorization', 'Bearer ' + this.keycloak.getToken() || '');
        // r.append('X-Requested-With', 'XMLHttpRequest');
        r = r.append('Access-Control-Allow-Origin', 'https://now.kooriim.com');
        // r = r.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, "OPTIONS');
        // r = r.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept');
        if (req.url.indexOf('auth') !== -1) {
            apiReq = req.clone({ headers: r, url: `${environment.routes.auth}/${req.url}` });
        } else {
            apiReq = req.clone({ headers: r, url: `${environment.routes.baseUrl}/${req.url}` });
        }
        console.log(apiReq);
        // this.spinner.loading= true;
        return next.handle(apiReq).pipe(tap(

            event => console.log(event),

            error => console.log(error)

        ), finalize(() => {
        })
        );
    }
}