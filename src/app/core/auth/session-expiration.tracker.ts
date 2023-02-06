import { Injectable, NgZone } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class SessionExpirationTracker {
    private sessionTime = window.testSessionTime || 60 * 60 * 1000; // 60 min;
    private showMessageDelta = window.testShowMessageDelta || 60 * 1000; // 1 min;
    private expiredTime: number;
    private checkInterval: any;
    private popupActive = false;

    constructor(
        private zone: NgZone,
        private authService: AuthService,
        private keycloakService: KeycloakService
    ) {
        this.keycloakService.authenticated$
            .asObservable()
            .pipe(distinctUntilChanged())
            .subscribe(authenticated => {
                if (authenticated) {
                    this.track();
                } else {
                    this.unTrack();
                }
            });
    }

    track() {
        this.zone.runOutsideAngular(() => {
            this.renewInterval();
            document.addEventListener('mousemove', this.mouseMoveHandler);
        });
    }

    unTrack() {
        this.stopInterval();
        document.removeEventListener('mousemove', this.mouseMoveHandler);
    }

    private mouseMoveHandler = () => {
        if (!this.popupActive) {
            this.stopInterval();
            this.renewInterval();
        }
    };

    private renewInterval(): void {
        this.expiredTime = this.sessionTime + new Date().getTime();
        this.popupActive = false;
        this.startCheckLoop();
    }

    private startCheckLoop() {
        this.checkInterval = setInterval(() => {
            if (this.notifySessionExpired(this.showMessageDelta)) {
                this.stopInterval();
            }
        }, 10000);
    }

    private stopInterval(): void {
        clearInterval(this.checkInterval);
    }

    private notifySessionExpired(notifyDelta: number): boolean {
        const expiredTime = this.expiredTime - new Date().getTime();
        const showMessage = expiredTime <= notifyDelta;

        if (showMessage) {
            this.zone.run(() => {
                console.warn('Session expired')
            });
        }
        return showMessage;
    }
}
