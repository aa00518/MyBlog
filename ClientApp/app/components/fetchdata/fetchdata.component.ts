import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Sandbox } from '../../providers/sandbox';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
    public users: any;
    public toggleWeather: boolean;

    constructor(http: Http, @Inject('ORIGIN_URL') originUrl: string, public sandbox: Sandbox) {
        this.toggleWeather = false;
        http.get(originUrl + '/api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        });
    }

    ngOnInit() {
        this.doSelectUsers();
    }
    
    doSelectUsers() {
        this.sandbox.getAppUsers().subscribe(response => {
            this.users = response;
        });
    }

    doToggleWeather() {
        this.toggleWeather = !this.toggleWeather;
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
