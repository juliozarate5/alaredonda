import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {LoginService} from '../../../services/login.service';
import {AlertService} from '../../../services/alert.service';

import {MenuController} from 'ionic-angular';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    data: any;
    fetchdata: any;
    public newlocal: any;
    constructor(private navCtrl: NavController, public navParams: NavParams,
        private alertas: AlertService, private servicio: LoginService, public menuCtrl: MenuController) {
        this.data = {};
        this.data.username = "";
        this.data.password = "";
        this.menuCtrl.enable(false, 'authenticated');
        this.menuCtrl.enable(false, 'authenticated2');
    }

    login() {
        let username = this.data.username;
        let password = this.data.password;
        let data = JSON.stringify({username, password});
        if (username != "" && password != "") {
            this.servicio.logear(data)
                .subscribe(data => {
                    this.fetchdata = data;
                    localStorage.setItem('nombres', this.fetchdata[0].nombres);
                    localStorage.setItem('establec', this.fetchdata[0].idestablecimiento);
                    this.alertas.loader("Ingresando,Por favor espere...", 1000);
                    this.navCtrl.setRoot(HomePage);
                }, error => {
                    if (error.statusText == "") {
                        this.alertas.alerta(
                            "Alerta",
                            "Verifique Conexion a la red",
                            'OK');
                    } else {
                        this.alertas.alerta(
                            "Alerta",
                            "Datos Erroneos, Por favor intente nuevamente",
                            'OK');
                    }
                }
                );
        } else {
            this.alertas.alerta(
                "Alerta",
                "Debe digitar cedula y clave",
                'OK');
        }
    }
}
