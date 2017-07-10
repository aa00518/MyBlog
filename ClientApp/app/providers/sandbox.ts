import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class Sandbox {
    private _jsonHeaders: Headers;
    //private API_URL: string = "http://localhost:5000/api/";
    //private API_URL: string = "http://myblogsite.azurewebsites.net/api/";
    private GET_USERS_URL: string = "/api/sandbox";

    constructor(public http: Http, @Inject('ORIGIN_URL') public originUrl: string) {
        this._jsonHeaders = new Headers({ 'Content-Type': 'application/json' });
    }

    getAppUsers() {
        return this.http.get(this.originUrl + this.GET_USERS_URL).map(res => res.json());
    }

    // putOnePeople(stringToSend: string) {
    //   //let person: string = 'farty_pants';
    //   //let body: any = JSON.stringify(person);
    //   //return this.http.post('http://localhost:5000/api/people', JSON.stringify({ name: 'Ricky Lake', city: 'Green Bay', dob: Date.now() }), { headers: this._jsonHeaders }).map(res => res.json());
    //   return this.http.post('http://localhost:5000/api/people', JSON.stringify(stringToSend), { headers: this._jsonHeaders }).map(res => res.json());
    //   //console.log('we got to here');
    // }

    // doSelect() {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(true);
    //     }, 2000);
    //   });
    // }
}
