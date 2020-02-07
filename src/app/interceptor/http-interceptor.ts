import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        @Inject('BASE_API_URL') private baseUrl: string,
        @Inject('BASE_CONTEXT') private baseContext: string) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let apiReq;
        let r = new HttpHeaders();
        // r.append('X-Requested-With', 'XMLHttpRequest');
        // r = r.append('Access-Control-Allow-Origin', '*');
        // r = r.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, "OPTIONS');
        // r = r.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept');
        apiReq = req.clone({ headers: r, url: `${this.baseUrl}${this.baseContext}/${req.url}` });
        console.log(apiReq);
        return next.handle(apiReq);
    }
}