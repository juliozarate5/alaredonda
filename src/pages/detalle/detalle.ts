import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
//import {DetalleService} from '../../../services/establecimiento.service';
import {DomicilePage} from '../domicile/domicile';
import {DomicilioService} from '../../../services/domicilio.service';
import {Domicilio} from '../../../services/domicilio';
import {LocalNotifications} from 'ionic-native';

import {AlertService} from '../../../services/alert.service';
@Component({
    selector: 'page-detalle',
    templateUrl: 'detalle.html'
})
export class DetallePage {
    idest: any;
    iduser: any
    lDomi: Domicilio[];
    listaDom: Domicilio;
    long: number;
    
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private alertas: AlertService, private servicio: DomicilioService) {
        this.idest = localStorage.getItem('establec');
        console.log(this.navParams.get('id'));
        this.loadDetalles(this.navParams.get('id'), this.idest);
        this.loadDomicilio(this.navParams.get('id'), this.idest);
    }

    confirmar(id) {
        this.servicio.setDomicilio(id, this.idest)
        .subscribe(
            res => console.log(res),
            er => console.log(er),
            () =>  {this.navCtrl.pop(DomicilePage),LocalNotifications.clearAll();
                        LocalNotifications.cancelAll()},
            );
    }
    
    cancelar(){
        this.navCtrl.pop(DomicilePage)
    }

    loadDetalles(id_domicilio, idest) {
       this.servicio.getItemsDomicilio(id_domicilio, idest)
            .subscribe(
            result => this.lDomi = result,
            er => console.log(er),
            () => console.log('ok')
            );
    }
    
    loadDomicilio(id, newest) {
        this.servicio.getDomicilio(id, newest)
            .subscribe(
            data => this.listaDom = data[0],
            er => console.log(er),
            () => console.log('ok')
            );
    }

    doRefresh(refresher) {
        setTimeout(() => {
            refresher.complete();
        }, 200);
    }
}
