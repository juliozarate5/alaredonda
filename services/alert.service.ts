/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Injectable} from '@angular/core';
import {AlertController, LoadingController} from 'ionic-angular';

@Injectable()
export class AlertService {

    constructor(private alert: AlertController, private loading: LoadingController) {

    }

    alerta(title: any, subtitle: any, button: any): void {
        let alert = this.alert.create({
            title: title,
            subTitle: subtitle,
            buttons: [button]
        });
        alert.present();
    }

    loader(content: any, duracion: number): void {
        let loader = this.loading.create({
            content: content,
            duration: duracion
        });
        loader.present();
    }
    
    confirmar(title: string, message: string, buttons: any): void{
        let alert = this.alert.create({
        title: title,
        message: message,
        buttons: buttons
      })
      alert.present();
    }
}