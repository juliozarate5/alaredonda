import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, App, ActionSheetController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';

import {PhotoPage} from '../pages/photo/photo';
import {ProductPage} from '../pages/product/product';
import {InventaryPage} from '../pages/inventary/inventary';
import {SalePage} from '../pages/sale/sale';
import {EmployePage} from '../pages/employe/employe';

import {DomicilePage} from '../pages/domicile/domicile';

import {LoginService} from '../../services/login.service';
import {AlertService} from '../../services/alert.service';

import {LoginPage} from '../pages/login/login';
/*background*/
import {BackgroundMode} from '@ionic-native/background-mode';
/*notifications*/
import {LocalNotifications} from 'ionic-native';
//import {Observable} from 'rxjs/Observable';
import {AgendaPage} from '../pages/agenda/agenda';
import {AgendaavPage} from '../pages/agendaav/agendaav';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage = LoginPage;
    pages: Array<{title: string, component: any, icon: string}>;
    agenda: Array<{title: string, component: any, icon: string}>;
    public home: HomePage;
    constructor(public platform: Platform, public statusBar: StatusBar,
        public splashScreen: SplashScreen, private lservice: LoginService,
        private alertas: AlertService, private bgmode: BackgroundMode,
        public app: App, public actionSheetCtrl: ActionSheetController) {
        this.initializeApp();
        this.bgmode.enable();
        this.bgmode.setDefaults({
            title: 'aLaRedonda',
            text: 'Toca para abrir'
        });
        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Inicio', component: HomePage, icon: 'home'},
            {title: 'Mis Fotos', component: PhotoPage, icon: 'images'},
            {title: 'Mis Productos', component: ProductPage, icon: 'basket'},
            {title: 'Mi Inventario', component: InventaryPage, icon: 'clipboard'},
            {title: 'Mis Ventas', component: SalePage, icon: 'cart'},
            {title: 'Mi Personal', component: EmployePage, icon: 'people'},
            {title: 'Mis Domicilios', component: DomicilePage, icon: 'walk'}
        ];
        
         this.agenda = [
            {title: 'Configuracion Básica', component: AgendaPage, icon: 'settings'},
            {title: 'Configuración Avanzada', component: AgendaavPage, icon: 'construct'},
            {title: 'Ver Agenda', component: AgendaPage, icon: 'calendar'},
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            /*this.splashScreen.hide();*/
            this.hideSplashScreen();
            this.platform.registerBackButtonAction(() => {
                let nav = this.app.getActiveNav();
                if (nav.canGoBack()) { //Can we go back?
                    nav.pop();
                } else {

                    let actionSheet = this.actionSheetCtrl.create({
                        title: 'Desea Salir de la App?',
                        buttons: [
                            {
                                text: 'Si',
                                handler: () => {
                                    this.lservice.logout();
                                    this.platform.exitApp();
                                    //Exit from app
                                }
                            }, {
                                text: 'Cancelar',
                                role: 'cancel',
                                handler: () => {
                                    //console.log('Cancel clicked');
                                }
                            }
                        ]
                    });
                    actionSheet.present();
                }
            });
        });
    }

    hideSplashScreen() {
        if (this.splashScreen) {
            setTimeout(() => {
                this.splashScreen.hide()
            }, 500);
        }
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
    
    ionViewWillLeave(){
        this.bgmode.enable();
    }

    salir() {
       // this.home.subscription.unsubscribe();
        this.clearAll();
        this.alertas.loader("Cerrando sesion de aLaRedonda App...", 1000);
        this.lservice.logout();
        localStorage.clear();
        this.nav.setRoot(LoginPage);
    }

    clearAll() {
        LocalNotifications.clearAll();
            //.then(() => console.log('All notifications cleared !'));
        LocalNotifications.cancelAll();
    
    }
    
    openAgenda(agenda){
        this.nav.setRoot(agenda.component);
    }
}


