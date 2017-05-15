/*
 *    Project:	alaredonda
 *    Version:	1.0.0
 *    Date:		16/03/2017 08:29:49 PM
 *    Author:	parasuempresa.com
 *
 *    Coded with Netbeans!
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Establecimiento} from './establecimiento';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class EstablecimientoService {

    private options;
    private url = "http://54.68.202.167/arl-est/api/index.php/establecimiento";
        
    constructor(private http: Http) {
        //let token = localStorage.getItem('token');
        let token = '12345';
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
            
        });
        this.options = new RequestOptions({ headers: headers});
    }

    getEstablecimiento(id: any): Observable<Establecimiento[]> {
        let url = `${this.url}/${id}`;
        return this.http.get(url, this.options)
        .first()
        .map(res => res.json())
        .catch(this.handleError);
        
    }
    
    updateEstablecimiento(estab: any){
        let url = `${this.url}`;
        let data =  JSON.stringify(estab);
        return this.http.put(url, data, this.options)
         .map(response => response.json())
         .catch(this.handleError);
    }
    
    private handleError(error: Response | any){
        let errMsg: string;
        if (error instanceof Response){
            let body = error.json() || '';
            let err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''}${err}`;
        }else{
            errMsg = error.message ? error.message: error.toString();
        }
        return Observable.throw(errMsg);
    }
}