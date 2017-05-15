import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'page-inventary',
    templateUrl: 'inventary.html'
})
export class InventaryPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    doRefresh(refresher) {
        setTimeout(() => {
            refresher.complete();
        }, 200);
    }
    
}
