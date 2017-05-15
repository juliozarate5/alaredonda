/*
 *    Project:	ionic-hello-world - ionic-hello-world
 *    Version:	1.0.0
 *    Date:		16/03/2017 08:28:24 PM
 *    Author:	parasuempresa.com
 *
 *    Coded with Netbeans!
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { Establecimiento } from './establecimiento';


@Injectable()
export class EstablecimientoService{
    
    private options;
    private url = "http://54.68.202.167/arl-est/apitest.php";
    
    constructor(){
        
    }
}