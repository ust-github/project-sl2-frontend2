import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakService } from '../auth/keycloak.service';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private keycloakService: KeycloakService) {}

    private static cloneHeaders(req: HttpRequest<any>): StringMap<string> {
        const httpHeaders: StringMap<string> = {};
        if (req.headers) {
            req.headers.keys().forEach(k => {
                httpHeaders[k] = req.headers.get(k);
            });
        }
        return httpHeaders;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.keycloakService.getTokenApi();
        const httpHeaders = AuthInterceptor.cloneHeaders(req);

        httpHeaders.Authorization = 'Bearer ' + token;

        // clone the request to add the new header
        const request = req.clone({ setHeaders: httpHeaders });
        return next.handle(request);
    }
}
