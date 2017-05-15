import {Component, ViewChild} from '@angular/core';
import {NavController, Nav} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {EditPage} from "../edit/edit";
import {EstablecimientoService} from '../../../services/establecimiento.service';
import {Establecimiento} from '../../../services/establecimiento';
import {AlertService} from '../../../services/alert.service';
import {MenuController} from 'ionic-angular';

/*notifications*/
import {LocalNotifications} from 'ionic-native';
import {DomicilePage} from '../domicile/domicile';
import {DomicilioService} from '../../../services/domicilio.service';
import {Domicilio} from '../../../services/domicilio';
import {Observable} from 'rxjs/Observable';
import { Vibration } from '@ionic-native/vibration';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Nav) nav: Nav
    //rootPage: any = LoginPage;
    public rootPage: any;
    public newlocal: any;
    newest: any;
    listaEst: Establecimiento;
    /*notifications*/
    notifications: any[] = [];
    login: LoginPage;
    listaDom: Domicilio[];
    public subscription;
    constructor(public navCtrl: NavController, private servicio: EstablecimientoService,
        private alertas: AlertService, public menuCtrl: MenuController,
        private domicilio: DomicilioService, private vibration: Vibration) {
        this.newlocal = localStorage.getItem('nombres');
        this.newest = localStorage.getItem('establec');
        this.menuCtrl.enable(true, 'authenticated');
        this.menuCtrl.enable(true, 'authenticated2');
        this.loadEstablecimiento(this.newest);
        this.rootPage = LoginPage;
        this.timer();
    }

    loadEstablecimiento(newest) {
        this.servicio.getEstablecimiento(newest).subscribe(
            data => this.listaEst = data[0],
            er => console.log(er),
            () => console.log('ok')
        );
    }

    editar() {
        this.alertas.loader("Por favor, espere...", 1000);
        this.navCtrl.push(EditPage);
    }

    ionViewWillEnter() {
        this.loadEstablecimiento(this.newest);
    }

    doRefresh(refresher) {
        setTimeout(() => {
            refresher.complete();
        }, 200);
    }

    timer() {
        let newest = this.newest;
        let url = DomicilePage;
        let nav = this.nav;
        let first = new Date();
        let lista = this.listaDom;
        let not = this.notifications;

        let tim = Observable.timer(1000, 18000);
        
        this.subscription = tim.subscribe(() => {
            if (localStorage.getItem('establec') !== null) {
                this.domicilio.getDomicilios(newest)
                    .subscribe(
                     data => {
                        lista = data,
                            lista.forEach((data) => {
                            not.push({
                                    id: data.id_domicilio,
                                    title: 'Pedido ' + data.id_domicilio,
                                    text: 'Un pedido pendiente!',
                                    at: first,
                                    //every: 'minute',
                                    sound: 'http://54.68.202.167/arl-est/alert.mp3',
                                });
                            })
                            /*mejorar vibración*/
                        if (not.length > 0) {
                            if(LocalNotifications.schedule(not)){
                                this.vibration.vibrate([2000,1000,2000]);
                            }
                            LocalNotifications.on('click', (notification, state) => {
                                nav.push(url);
                            });
                            not = [];
                        } else {
                        LocalNotifications.clearAll();
                        LocalNotifications.cancelAll();
                        return;
                        }
                    },
                    er => console.log(er),
                    () => console.log('ok')
                    )
            }else {
                this.untimer();
                return;
            }
        });

    }


    untimer() {
        this.subscription.unsubscribe();
    }

}
