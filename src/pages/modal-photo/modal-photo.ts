
import {Component, ViewChild} from '@angular/core';

import {Platform, NavParams, ViewController, Nav} from 'ionic-angular';

//import { PhotoPage } from "../photo/photo";
import {GaleriaService} from '../../../services/galeria.service';
import {Galeria} from '../../../services/galeria';


@Component({
    templateUrl: 'modal-photo.html'
    /*template: `
   <ion-header>
     <ion-toolbar>
       <ion-title>
         Descripcion
       </ion-title>
       <ion-buttons start>
         <button ion-button (click)="dismiss()">
           <span ion-text color="primary" showWhen="ios">Cancel</span>
           <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
         </button>
       </ion-buttons>
     </ion-toolbar>
   </ion-header>
   <ion-content>
     <ion-list>
         <ion-item>
           <ion-avatar item-left>
             <img width="351" height="350" src="http://54.68.202.167/alaredonda/uploaded/est_fotos/{{this.lista?.imagen}}">
           </ion-avatar>
   
         </ion-item>
         <ion-item>
           <ion-item>
               <button ion-button icon-left (click)="asignarPerfil()">
                       <ion-icon name="tablet-portrait"></ion-icon>Colocar como perfil
               </button>
               <button ion-button icon-left (click)="eliminarImage()">
                       <ion-icon name="trash"></ion-icon>Eliminar
               </button>
           </ion-item>
         </ion-item>
     </ion-list>
   </ion-content>
   `*/
})
export class ModalPhotoPage {
    @ViewChild(Nav) nav: Nav;  
    character;
    id: number;
    newest: any;
    lista: Galeria;

    constructor(public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController, private servicio: GaleriaService) {

        this.newest = localStorage.getItem('establec');
        
        this.character = this.params.get('idGal');
        this.loadGaleriaOne(this.character);
        //this.id = this.params.get('id_galeria_est');
    }
    
    loadGaleriaOne(char) {
        this.servicio.getGaleriaOne(this.newest, char)
            .subscribe(
            data => this.lista = data[0],
            er => console.log(er),
            () => console.log('OK')
            );
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    asignarPerfil(id, img) {
        this.servicio.updateGaleria(this.newest, id, img)
            .subscribe(
            res =>console.log(res),
            er => console.log(er),
            () => console.log('OK')
            );
            this.dismiss();
    }

    eliminarImage(id, val) {
        this.servicio.deleteGaleria(id, val)
            .subscribe(
            res => console.log(res),
            er => console.log(er),
            () => console.log('OK')
            );
            this.dismiss();
    }

    /*colocar function de confirmacion de eliminacion*/
}