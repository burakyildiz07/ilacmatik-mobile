import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalServiceProvider {

	apiUrl = 'http://192.168.1.24:8000/api';

	constructor(public http: Http) {
		
	}
}
