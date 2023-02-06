import * as Keycloak from 'keycloak-js';
import { BehaviorSubject, Subject } from 'rxjs';

import { environment } from '@app/env';


export class KeycloakService {
    private readonly instance: Keycloak.KeycloakInstance;

    private timerHandler: number;
    private logEnabled = false;

    readonly onRefreshToken$ = new Subject<void>();
    readonly authenticated$ = new BehaviorSubject(false);

    constructor() {
        this.instance = Keycloak(environment.keycloakParams);
        this.instance.onAuthRefreshSuccess = () => {
            this.log('The Keycloak token has been refreshed successfully');
        };
        this.instance.onAuthRefreshError = () => {
            console.error('Cannot refresh the Keycloak authorization token.');
        };
        this.instance.onReady = (result: boolean) => {
            this.log('The Keycloak service is ready with result =' + result);
        };
        this.instance.onTokenExpired = () => {
            this.log('The Keycloak token has expired.');
            this.clearRefreshTimeout();
            this.instance.updateToken(-1).success(() => {
                this.log('The Keycloak token has been refreshed.');
                this.onRefreshToken$.next();
                this.authenticated$.next(true);
            });
        };
        this.instance.onAuthLogout = () => {
            this.authenticated$.next(false);

            this.clearRefreshTimeout();
        };
    }

    /**
     * init and login
     */
    login(): Promise<any> {
        this.clearRefreshTimeout();
        this.instance.clearToken();
        return new Promise((resolve, reject) => {
            this.instance
                .init({ onLoad: 'login-required', redirectUri: location.href })
                .success(() => {
                    this.authenticated$.next(true);

                    resolve();
                })
                .error(reject);
        });
    }

    /**
     * logout
     */
    logout(): Promise<void> {
        this.clearRefreshTimeout();
        return new Promise<void>((resolve, reject) => {
            if (this.instance.authenticated) {
                this.instance
                    .logout()
                    .success(() => {
                        resolve();
                    })
                    .error(() => {
                        reject('Failed to logout');
                    });
            } else {
                resolve();
            }
        });
    }

    getTokenApi() {
        return this.instance.token || '';
    }

    private clearRefreshTimeout() {
        if (this.timerHandler) {
            this.log('The Keycloak token refresh timer is OFF.');
            window.clearTimeout(this.timerHandler);
            this.timerHandler = null;
        }
    }

    private log(msg: string) {
        if (this.logEnabled) {
            console.log(msg);
        }
    }
}

export const keycloakService = new KeycloakService();
