import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {EmployeService} from '../../../services/employe.service';

import {TipoEmplService} from '../../../services/tipoempl.service';
import {TipoEmpl} from '../../../services/tipoempl';

@Component({
    templateUrl: 'modal-employe.html'
})

export class ModalEmployePage {
    listaTipoE: TipoEmpl[];
    form: FormGroup;
    constructor(private formB: FormBuilder, public navCtrl: NavController,
        private viewCtrl: ViewController, private servicio: EmployeService,
        private tipo: TipoEmplService) {
        this.buildForm();
        this.getTiposEmpl();
    }

    buildForm() {
        this.form = this.formB.group({
            //tipo: [0],
            nombre: ['', Validators.required],
            cedula: ['',Validators.required],
            tipo: ['',Validators.required],
            idest : [localStorage.getItem('establec')]
        })
    }

    insertEmploye() {
        this.servicio.insertEmploye(this.form.value)
            .subscribe(
            res => console.log(res),
            er => console.log(this.form.value.idest),
            () => this.dismiss() 
            )
    }

    getTiposEmpl() {
        this.tipo.getTipoEmpl()
            .subscribe(
            data => this.listaTipoE = data,
            er => console.log(er),
            () => console.log('OK!')
            )
    }

    dismiss() {
        let data = this.form.value;
        this.viewCtrl.dismiss(data);
    }

}