import {Component} from '@angular/core';
import {ModalController} from 'ionic-angular';

import {EmployeService} from '../../../services/employe.service';
import {Employe} from '../../../services/employe';

import {ModalEmployePage} from "../modal-employe/modal-employe";

@Component({
    selector: 'page-employe',
    templateUrl: 'employe.html'
})
export class EmployePage {
    data: any;
    nombre: any;
    newest: any;
    listaProd: Employe[];
    listaPr1: Employe[];
    long: number;

    constructor(private servicio: EmployeService, public modalCtrl: ModalController) {
        this.data = {};
        this.data.nombre = "";
        this.newest = localStorage.getItem('establec');
        this.loadEmployes(this.newest);
    }

    loadEmployes(newest) {
        this.listaPr1 = null;
        this.servicio.getEmployes(newest)
            .subscribe(
            data => {this.listaProd = data,this.long = data.length},
            er => console.log(er),
            () => console.log('ok')
            );
    }

    getEmploye(evt) {
        let nom = this.data.nombre;
        if (nom !== "") {
            this.listaProd=null;
            this.servicio.getEmploye(this.newest, nom)
                .subscribe(
                data => this.listaPr1 = data,
                er => console.log(er),
                () => console.log('ok')
                );
        } else {
            this.listaPr1 = null;
             this.loadEmployes(this.newest);
        }
    }

    doRefresh(refresher) {
        this.loadEmployes(this.newest);
        setTimeout(() => {
            refresher.complete();
        }, 200);
    }
    
    ionViewWillEnter() {
        this.loadEmployes(this.newest);
    }

    presentPageModal() {
        let pageModal = this.modalCtrl.create(ModalEmployePage);
        pageModal.present()
    }
    
    onCancel(evt){
        this.loadEmployes(this.newest);
    }

}



