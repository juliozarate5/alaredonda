/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Employe} from './employe';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeService {

    private options;
    private url = "http://54.68.202.167/arl-est";
    

    constructor(private http: Http) {
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',

        });
        this.options = new RequestOptions({headers: headers});
    }

    getEmployes(idest: any): Observable<Employe[]> {
        let url = `${this.url}/semp.php`;
        let data = JSON.stringify({idest});
        return this.http.post(url, data, this.options)
            .map(res => res.json()).
            catch(this.handleError);;
    }

    getEmploye(idest: any, nom: any): Observable<Employe[]> {
        let url = `${this.url}/semp1.php`;
        let data = JSON.stringify({idest, nom});
        return this.http.post(url, data, this.options)
            .map(res => res.json()).
            catch(this.handleError);;
    }
    
    /*getEmployes2(idest: any): Observable<Employe[]> {
        let url = `${this.url}/semp2.php`;
        let data = JSON.stringify({idest});
        return this.http.post(url, data, this.options)
            .map(res => res.json()).
            catch(this.handleError);;
    }*/

    insertEmploye(producto: Employe) {
        let url = `${this.url}/iemp.php`;
        let data = JSON.stringify(producto);
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