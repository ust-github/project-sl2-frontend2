import { keycloakService, KeycloakService } from './keycloak.service';
import { AuthService } from './auth.service';
import { SessionExpirationTracker } from './session-expiration.tracker';

export function login() {
    return keycloakService.login();
}

export const AUTH_PROVIDERS = [
    {
        provide: KeycloakService,
        useValue: keycloakService,
    },
    AuthService,
    SessionExpirationTracker,
];

export { AuthService, SessionExpirationTracker };
