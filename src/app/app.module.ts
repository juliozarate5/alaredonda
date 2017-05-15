import {NgModule, ErrorHandler, LOCALE_ID} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {EditPage} from '../pages/edit/edit';
import {EstablecimientoService} from '../../services/establecimiento.service';
import {LoginService} from '../../services/login.service';
import {AlertService} from '../../services/alert.service';
/*paginas de la pestaña*/
import {DomicilePage} from "../pages/domicile/domicile";
import {EmployePage} from "../pages/employe/employe";
import {InventaryPage} from "../pages/inventary/inventary";
import {PhotoPage} from "../pages/photo/photo";
import {ProductPage} from "../pages/product/product";
import {SalePage} from "../pages/sale/sale";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {ModalPhotoPage} from "../pages/modal-photo/modal-photo";

import {GaleriaService} from '../../services/galeria.service';
import {ProductoService} from '../../services/producto.service';
import {ModalPage} from "../pages/modal/modal";

import {DetallePage} from "../pages/detalle/detalle";

import {UnidadService} from '../../services/unidad.service';

import {ModalEmployePage} from "../pages/modal-employe/modal-employe";
import {EmployeService} from '../../services/employe.service';

import {TipoEmplService} from '../../services/tipoempl.service';
import {DomicilioService} from '../../services/domicilio.service';

import {BackgroundMode} from '@ionic-native/background-mode';
import { Vibration } from '@ionic-native/vibration';

import {AgendaavPage} from "../pages/agendaav/agendaav";
import {AgendaService} from '../../services/agenda.service';

import {AgendaPage} from "../pages/agenda/agenda";
/*calendario agendas*/
import {NgCalendarModule} from 'ionic2-calendar';
@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        EditPage,
        DomicilePage,
        EmployePage,
        InventaryPage,
        PhotoPage,
        ProductPage,
        SalePage,
        ModalPhotoPage,
        ModalPage,
        ModalEmployePage,
        DetallePage,
        AgendaPage,
        AgendaavPage
    ],
    imports: [
        NgCalendarModule,
        IonicModule.forRoot(MyApp),
        //CloudModule.forRoot(cloudSettings)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        EditPage,
        DomicilePage,
        EmployePage,
        InventaryPage,
        PhotoPage,
        ProductPage,
        SalePage,
        ModalPhotoPage,
        ModalPage,
        ModalEmployePage,
        DetallePage,
        AgendaPage,
        AgendaavPage
    ],
    providers: [EstablecimientoService, LoginService, AlertService, GaleriaService,
        ProductoService,
        UnidadService,
        EmployeService,
        TipoEmplService,
        DomicilioService,
        AgendaService,
        BackgroundMode,
        StatusBar,
        SplashScreen,
        Vibration,
        { provide: LOCALE_ID, useValue: 'es-US' },
        {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
