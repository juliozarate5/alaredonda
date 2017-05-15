/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Domicilio} from './domicilio';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class DomicilioService {

    private options;
    private url = "http://54.68.202.167/arl-est";
    

    constructor(private http: Http) {
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',

        });
        this.options = new RequestOptions({headers: headers});
    }

    getDomicilios(idest: any): Observable<Domicilio[]> {
        let url = `${this.url}/sdom.php`;
        let data = JSON.stringify({idest});
        return this.http.post(url, data, this.options)
            .map(res => res.json()).
            catch(this.handleError);;
    }
    
    getItemsDomicilio(id_dom: any, idest: any): Observable<Domicilio[]> {
         let url = `${this.url}/sdomi.php`;
        let data = JSON.stringify({id_dom, idest});
        return this.http.post(url, data, this.options)
            .map(res => res.json()).
            catch(this.handleError);;
    }
    
   getDomicilio(id_dom: any, idest: any): Observable<Domicilio[]> {
        let url = `${this.url}/sdom1.php`;
        let data = JSON.stringify({id_dom, idest});
        return this.http.post(url, data, this.options)
            .map(res => res.json()).
            catch(this.handleError);;
    }
    
    setDomicilio(id_dom: any, idest: any){
        let url = `${this.url}/udom.php`;
        let data = JSON.stringify({id_dom, idest});
        return this.http.post(url, data, this.options)
            .map(res => res.json()).
            catch(this.handleError);;
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            let body = error.json() || '';
            let err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''}${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
    
    
}