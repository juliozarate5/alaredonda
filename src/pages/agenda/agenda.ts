/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
//import {Agenda} from '../../../services/agenda';
import {AgendaService} from '../../../services/agenda.service';

import {EmployeService} from '../../../services/employe.service';
import {Employe} from '../../../services/employe';

import {AlertService} from '../../../services/alert.service';
@Component({
    selector: 'page-agenda',
    templateUrl: 'agenda.html'
})
export class AgendaPage {
    eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };
    empleado: any;
    hora: any;
    seleccionado: any;
    newest: any;
    listaEmpl: Employe[];
    codigo: any;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private servicio: AgendaService, private toastCtrl: ToastController,
        private emp: EmployeService, private alert: AlertService) {
        this.empleado = [];
        this.newest = localStorage.getItem('establec');
        this.loadEmployes(this.newest);
        /*this.empleado = [
            'Julio', 'Carolina', 'Ella', 'El Santi', 'Mami', 'Juanpa', 'LuisK'
        ];*/
        this.hora = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    }

    loadEmployes(newest) {
        this.emp.getEmployes(newest)
            .subscribe(
            data => {
                this.listaEmpl = data,
                    this.listaEmpl.forEach((item) => {
                    this.empleado.push({nombre: item.nombre, id: item.id_personal})
                    });
            },
            er => console.log(er),
            () => {}
            );
    }
    
  loadAgendamiento(newest) {
        this.emp.getEmployes(newest)
            .subscribe(
            data => {
                this.listaEmpl = data,
                    this.listaEmpl.forEach((item) => {
                    this.empleado.push({nombre: item.nombre, id: item.id_personal})
                    });
            },
            er => console.log(er),
            () => {}
            );
    }

    loadEvents() {
        //this.eventSource = this.createRandomEvents();
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
       // this.eventSource = this.createEvents();
    }

    onEventSelected(event) {
        //console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
        let hora = event.hora + ':00:00';
        let dia = event.dia;
        let idemp = event.idemp;
        let nombre = event.title;
        this.confirma(hora, dia, idemp, nombre);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
        if (this.calendar.mode === 'day') {
            //this.eventSource = null;
            this.eventSource = this.createEvents();
        } else {
            this.eventSource = null;
        }
    }

    today() {
        this.calendar.currentDate = new Date();
        if (this.calendar.mode === 'day') {
            //this.eventSource = null;
            this.eventSource = this.createEvents();
        } else {
            this.eventSource = null;
        }
    }

    onTimeSelected(ev) {
        if (ev.selectedTime === undefined) {
            ev.selectedTime = this.calendar.currentDate;
        }
        /*console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);*/
        this.seleccionado = ev.selectedTime;
    }

    onCurrentDateChanged(event: Date) {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    createEvents() {
        let events = [];
        let timed = this.seleccionado;
        /*let dateString = '2017-04-20 05:00:00';
        dateString = dateString.split(' ').join('T');
        let date = new Date(dateString);*/
        this.hora.forEach((h) => {
            let startTime = new Date(Date.UTC(timed.getUTCFullYear(), timed.getUTCMonth(), timed.getUTCDate(), timed.getUTCHours() + 5 + h));
            let endTime = new Date(Date.UTC(timed.getUTCFullYear(), timed.getUTCMonth(), timed.getUTCDate(), timed.getUTCHours() + 6 + h));
            this.empleado.forEach((emp) => {
                events.push({
                    title: emp.nombre,
                    idemp: emp.id,
                    startTime: startTime,
                    endTime: endTime,
                    hora: timed.getHours() + 5 + h,
                    dia: timed.getDay(),
                    allDay: false,
                });

            });
        });
        return events;
    }


    /*
        onRangeChanged(ev) {
            console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
        }
    
        markDisabled = (date: Date) => {
            let current = new Date();
            current.setHours(0, 0, 0);
            return date < current;
        };
        cancelar() {
    
        }*/
    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Toca primero un día deseado y luego toca el botón DETALLAR.\n\n\
            En el detalle toca para asignar el personal a la hora tocada.\n\n\
            Se mostrará un aviso confirmando si está o no asignado.',
            showCloseButton: true,
            closeButtonText: 'OK'
        });

        toast.onDidDismiss(() => {
            //console.log('Dismissed toast');
        });

        toast.present();
    }

    insertAgendaHora(hora, dia, idemp) {
        this.servicio.insertAgendaHour(hora, dia, idemp, this.newest)
            .subscribe(
            res => {this.alert.alerta('Aviso', res.aviso, 'OK')},
            er => console.log('error'),
            () => {}
            )
    }

    confirma(hora, dia, idemp, nombre) {
        this.alert.confirmar(
            'Asignar disponibilidad',
            '¿Desea Asignar las ' + hora + ' horas a ' + nombre+'?',
            [{
                text: 'OK',
                handler: () => {this.insertAgendaHora(hora, dia, idemp)}
            }, {
                text: "Cancel",
                role: 'cancel'
            }]
        )
    }

}
