import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ProductoService} from '../../../services/producto.service';

import {UnidadService} from '../../../services/unidad.service';
import {Unidad} from '../../../services/unidad';

@Component({
    templateUrl: 'modal.html'
})

export class ModalPage {
    listaUni: Unidad[];
    form: FormGroup;
    newest: any;
    constructor(private formB: FormBuilder, public navCtrl: NavController,
        private viewCtrl: ViewController, private servicio: ProductoService,
        private unity: UnidadService) {
        this.buildForm();
        this.getUnidades();
    }

    buildForm() {
        this.form = this.formB.group({
            //tipo: [0],
            nombre: ['', Validators.required],
            precio: [0],
            unidad: ['', Validators.required],
            idest : [localStorage.getItem('establec')]
        })
    }

    insertProducto() {
        this.servicio.insertProducto(this.form.value)
            .subscribe(
            res => console.log(res),
            er => console.log(this.form.value.idest),
            () => this.dismiss() 
            )
    }

    getUnidades() {
        this.unity.getUnity()
            .subscribe(
            data => this.listaUni = data,
            er => console.log(er),
            () => console.log('OK!')
            )
    }

    dismiss() {
        let data = this.form.value;
        this.viewCtrl.dismiss(data);
    }

}