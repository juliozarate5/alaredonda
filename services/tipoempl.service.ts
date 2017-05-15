/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';


import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class TipoEmplService {
    private options;
    private url = "http://54.68.202.167/arl-est";

    constructor(private http: Http) {
        let headers = new Headers({
            'Content-Type': 'application/json; charset=iso-8859-1',
        });
        this.options = new RequestOptions({headers: headers});
    }

    getTipoEmpl() {
        let url = `${this.url}/stip.php`;
        let data = JSON.stringify('');
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

