import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    public toggleHelp: boolean;

    constructor() {
        this.toggleHelp = false;
    }

    ngOnInit() {
    }

    doToggleHelp() {
        this.toggleHelp = !this.toggleHelp;
    }
}
