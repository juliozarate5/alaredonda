import {Component} from '@angular/core';
import {ModalController} from 'ionic-angular';

import {ProductoService} from '../../../services/producto.service';
import {Producto} from '../../../services/producto';

import {ModalPage} from "../modal/modal";

@Component({
    selector: 'page-product',
    templateUrl: 'product.html'
})
export class ProductPage {
    data: any;
    nombre: any;
    newest: any;
    listaProd: Producto[];
    listaPr1: Producto[];
    long: number;

    constructor(private servicio: ProductoService, public modalCtrl: ModalController) {
        this.data = {};
        this.data.nombre = "";
        this.newest = localStorage.getItem('establec');
        this.loadProductos(this.newest);
    }

    loadProductos(newest) {
        this.listaPr1 = null;
        this.servicio.getProductos(newest)
            .subscribe(
            data => {this.listaProd = data,this.long = data.length},
            er => console.log(er),
            () => console.log('ok')
            );
    }

    getProducto() {
        let nom = this.data.nombre;
        if (nom !== "") {
            this.listaProd=null;
            this.servicio.getProducto(this.newest, nom)
                .subscribe(
                data => this.listaPr1 = data,
                er => console.log(er),
                () => console.log('ok')
                );
        } else {
            this.listaPr1 = null;
            this.loadProductos(this.newest);
        }
    }

    doRefresh(refresher) {
        this.loadProductos(this.newest);
        setTimeout(() => {
            refresher.complete();
        }, 200);
    }
    
    ionViewWillEnter() {
        this.loadProductos(this.newest);
    }

    presentPageModal() {
        let pageModal = this.modalCtrl.create(ModalPage);
        pageModal.present()
    }
    
      onCancel(evt){
          this.loadProductos(this.newest);
    }

}



