import { Component, OnInit } from '@angular/core';

import { ApiService } from './shared/services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ApiService]
})
export class AppComponent implements OnInit {
    title = 'frontend';

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {        
		this.apiService.getGreetings().subscribe((greetings: string) => {
            if (greetings) {
                this.title = greetings;
            }
        });
    }
}
