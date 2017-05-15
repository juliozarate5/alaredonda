import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {EstablecimientoService} from '../../../services/establecimiento.service';
import {Establecimiento} from '../../../services/establecimiento';

import {AlertService} from '../../../services/alert.service';
@Component({
    selector: 'page-edit',
    templateUrl: 'edit.html'
})
export class EditPage {
    idest: any;
    estab: Establecimiento;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private servicio: EstablecimientoService, private alertas: AlertService) {
        this.idest = localStorage.getItem('establec');
        this.loadEstablecimiento(this.idest);
    }

    loadEstablecimiento(id) {
        this.servicio.getEstablecimiento(id).subscribe(
            data => this.estab = data[0],
            er => console.log(er),
            () => console.log('ok')
        );
    }

    guardar(form) {
        let arrayForm = form.value;
        this.servicio.updateEstablecimiento(arrayForm)
            .subscribe(
            res => {
                this.alertas.loader("Guardando los cambios...", 1000),
                console.log(res)
            },
            error => this.alertas.alerta("Alerta", error, "OK"),
            () => {}
            )
    }

    doRefresh(refresher) {
        setTimeout(() => {
            refresher.complete();
        }, 200);
    }
    
}
