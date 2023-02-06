import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable} from 'rxjs';

import { environment } from '@app/env';

@Injectable()
export class ApiService {
    private readonly apiUrl = `${environment.apiUrl}`;

    constructor(private httpClient: HttpClient) {}
	
	getGreetings(): Observable<string> {
        return this.httpClient.get<string>(`${this.apiUrl}/greetings`, { responseType: 'text'  as 'json' });
    }
}
