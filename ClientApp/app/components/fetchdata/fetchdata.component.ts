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
    public rainFallAmount: string;
    public forecasts: WeatherForecast[];
    public toggleWeather: boolean;
    public users: any;
    public rf: any;

    constructor(http: Http, @Inject('ORIGIN_URL') originUrl: string, public sandbox: Sandbox, public rainFall: RainFall ) {
        this.rainFallAmount = "";
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

    doInsertRainFall() {
        if (this.rainFallAmount.trim() === "") {
            this.rainFallAmount = "1";
        }
        let rfAmount: number = Number.parseFloat(this.rainFallAmount);
        this.rainFall.insertRainFall(this.calendarValue.toLocaleDateString(), rfAmount).subscribe(response => {
            this.doSelectRainFall();
        });
    }

    doDeleteRainFall(id: number) {
        this.rainFall.deleteRainFall(id).subscribe(response => {
            this.doSelectRainFall();
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
