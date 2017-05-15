import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'page-sale',
    templateUrl: 'sale.html'
})
export class SalePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    doRefresh(refresher) {
        setTimeout(() => {
            refresher.complete();
        }, 200);
    }
    
}
