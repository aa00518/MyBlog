import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Sandbox } from '../../providers/sandbox';
import { RainFall } from '../../providers/rainfall';
import { GrowlModule } from 'primeng/components/growl/growl';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Message } from 'primeng/components/common/message';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
    providers: [ConfirmationService]
})
export class FetchDataComponent {
    public calendarValue: Date;
    public rainFallAmount: string;
    public forecasts: WeatherForecast[];
    public toggleWeather: boolean;
    public users: any;
    public rf: any;
    public msgs: Message[] = [];

    constructor(http: Http, @Inject('ORIGIN_URL') originUrl: string, public sandbox: Sandbox, public rainFall: RainFall,
                private confirmationService: ConfirmationService ) {
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
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.rainFall.deleteRainFall(id).subscribe(response => {
                    this.doSelectRainFall();
                });
                this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            },
            reject: () => {
                //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            }
        });
    }

    doToggleWeather() {
        this.toggleWeather = !this.toggleWeather;
    }

    // confirm1() {
    //     this.confirmationService.confirm({
    //         message: 'Are you sure that you want to proceed?',
    //         header: 'Confirmation',
    //         icon: 'fa fa-question-circle',
    //         accept: () => {
    //             this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
    //         },
    //         reject: () => {
    //             this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
    //         }
    //     });
    // }

    // confirmDeleteRainFall() {
    // }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
