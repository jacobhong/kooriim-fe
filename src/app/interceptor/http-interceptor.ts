import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(
        @Inject('BASE_API_URL') private baseUrl: string,
        @Inject('BASE_CONTEXT') private baseContext: string) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let apiReq;
        if (req.url.includes('assets/')) {
            apiReq = req.clone({ url: `${this.baseUrl}/${req.url}` });
        } else {
            apiReq = req.clone({ url: `${this.baseUrl}${this.baseContext}/${req.url}` });
        }
        return next.handle(apiReq);
    }
}