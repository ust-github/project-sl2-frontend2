import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AUTH_PROVIDERS, SessionExpirationTracker } from '@app/auth';
import { HTTP_INTERCEPTOR_PROVIDERS } from './http-interceptors';

@NgModule({
    imports: [
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'XSRF-TOKEN',
            headerName: 'X-XSRF-TOKEN',
        }),
    ],
    providers: [
        ...HTTP_INTERCEPTOR_PROVIDERS,
        ...AUTH_PROVIDERS
    ],
})
export class CoreModule {
    constructor(private sessionExpiration: SessionExpirationTracker) {}
}
