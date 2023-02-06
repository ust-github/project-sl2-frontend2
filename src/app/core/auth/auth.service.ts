import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

import { KeycloakService } from './keycloak.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public readonly onAfterLogin = new ReplaySubject<any>(1, 5000);
    public readonly onBeforeLogoff = new Subject<void>();

    constructor(private keycloakService: KeycloakService) {}

    logout() {
        this.onBeforeLogoff.next();
        this.keycloakService.logout();
    }

    getTokenApi() {
        return this.keycloakService.getTokenApi();
    }
}
