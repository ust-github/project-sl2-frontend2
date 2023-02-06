import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { environment } from '@app/env';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreModule,
        BrowserModule,
        AppRoutingModule,
        SharedModule.forRoot()
    ],
    providers: [
        {
            provide: 'environment',
            useValue: environment
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
