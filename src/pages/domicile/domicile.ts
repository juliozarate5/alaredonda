import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DetallePage} from "../detalle/detalle";

import {DomicilioService} from '../../../services/domicilio.service';
import {Domicilio} from '../../../services/domicilio';

@Component({
    selector: 'page-domicile',
    templateUrl: 'domicile.html'
})
export class DomicilePage {
    data: any;
    nombre: any;
    newest: any;
    listaDom: Domicilio[];
    long: number;
    
    constructor(private servicio: DomicilioService, public navCtrl:NavController) {
        this.data = {};
        this.data.nombre = "";
        this.newest = localStorage.getItem('establec');
        this.loadDomicilios(this.newest);
    }

    loadDomicilios(newest) {
        this.servicio.getDomicilios(newest)
            .subscribe(
            data => {this.listaDom = data, this.long = data.length},
            er => console.log(er),
            () => console.log('ok')
            );
    }


    doRefresh(refresher) {
        this.loadDomicilios(this.newest);
        setTimeout(() => {
            refresher.complete();
        }, 200);
    }
    
    ionViewWillEnter() {
        this.loadDomicilios(this.newest);
    }
    
    cargarAnteriores(){
         setTimeout(() => {
        }, 200); 
    }
    
    verDetalle(item){    
        this.navCtrl.push(DetallePage, {
            id: item.id_domicilio
        });
    }
}



