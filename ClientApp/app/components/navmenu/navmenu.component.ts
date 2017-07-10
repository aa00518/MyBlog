import { Component } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    public innerWidth: number;
    public isMobile: boolean;

    constructor() {
    }

    ngOnInit() {
        this.innerWidth = window.innerWidth;
        this.checkWindowWidth();
    }

    onResize(event) {
        this.innerWidth = event.target.innerWidth;
        this.checkWindowWidth();
    }

    checkWindowWidth() {
        if (this.innerWidth < 768) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
        //console.log(this.innerWidth);
    }
}
