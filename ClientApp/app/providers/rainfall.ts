import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class RainFall {
    private _jsonHeaders: Headers;
    //private API_URL: string = "http://localhost:5000/api/";
    //private API_URL: string = "http://myblogsite.azurewebsites.net/api/";
    private GET_RAINFALL_URL: string = "/api/rainfall";
    private INSERT_RAINFALL_URL: string = "/api/rainfall/insertrainfall";

    constructor(public http: Http, @Inject('ORIGIN_URL') public originUrl: string) {
        this._jsonHeaders = new Headers({ 'Content-Type': 'application/json' });
    }

    getRainFall() {
        return this.http.get(this.originUrl + this.GET_RAINFALL_URL).map(res => res.json());
    }

    insertRainFall(rainFallDate: string, rainFallAmount: number) {
        return this.http.post(this.originUrl + this.INSERT_RAINFALL_URL,
                               JSON.stringify({ RainFallDate: rainFallDate, RainFallAmount: rainFallAmount }),
                               { headers: this._jsonHeaders }).map(res => res.json());
    }

    // doSelect() {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(true);
    //     }, 2000);
    //   });
    // }
}
