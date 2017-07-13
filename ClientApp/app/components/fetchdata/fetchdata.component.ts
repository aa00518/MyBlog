import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Sandbox } from '../../providers/sandbox';
import { RainFall } from '../../providers/rainfall';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public calendarValue: Date;
    public forecasts: WeatherForecast[];
    public toggleWeather: boolean;
    public users: any;
    public rf: any;

    constructor(http: Http, @Inject('ORIGIN_URL') originUrl: string, public sandbox: Sandbox, public rainFall: RainFall ) {
        this.calendarValue = new Date();
        this.toggleWeather = false;
        http.get(originUrl + '/api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        });
    }

    ngOnInit() {
        this.doSelectUsers();
        this.doSelectRainFall();
    }
    
    doSelectUsers() {
        this.sandbox.getAppUsers().subscribe(response => {
            this.users = response;
        });
    }

    doSelectRainFall() {
        this.rainFall.getRainFall().subscribe(response => {
            this.rf = response;
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
