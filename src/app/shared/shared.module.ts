import { NgModule } from '@angular/core';


const components: any[] = [
];

const modules: any[] = [
];

const pipes: any[] = [
];

const directives: any[] = [
];

const providers = [
];

@NgModule({
    declarations: [...components, ...pipes, ...directives],
    imports: [
        ...modules
    ],
    entryComponents: [],
    exports: [...modules, ...components, ...pipes, ...directives],
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [...providers],
        };
    }
}
