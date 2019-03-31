import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {GlobalServiceProvider} from "./global-service";
import {PassportServiceProvider} from "./passport-service";
import {Events} from "ionic-angular";
import {Storage} from "@ionic/storage";

@Injectable()
export class MedicineServiceProvider {
    medicineUrl = '/reminders';

    constructor(
        public global: GlobalServiceProvider,
        public events: Events,
        private http: Http,
        public storage: Storage,
        public authHttp: HttpClient) {
    }

    create(data: {}) {
        return this.authHttp.post(this.global.apiUrl+this.medicineUrl, data)
            .map(response => response)
            .map(data => {
                return data;
            });

    };

    index() {
        return this.authHttp.get(this.global.apiUrl+this.medicineUrl)
            .map(response => response)
            .map(data => {
                return data;
            });

    };



}
