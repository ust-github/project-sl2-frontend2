import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@app/env';
import { login } from '@app/auth';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
    platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch(e => {
            console.error(e);
            showError();
        });
}

login().then(bootstrap);

function showError() {
    // hide loader
    const loader = document.getElementById('loader');
    loader.parentNode.removeChild(loader);

    document.body.insertAdjacentHTML(
        'beforeend',
        `<div class="bootstrap-error"><p>Something went wrong</p><div class="btn btn-primary btn-sm">Try again</div></div>`
    );
    const errorCard = document.body.lastChild as HTMLDivElement;
    errorCard.querySelector<HTMLDivElement>('.btn').onclick = () => location.reload();
}
