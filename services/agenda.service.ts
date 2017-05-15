
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

/*import {Agenda} from './agendas';
import {Observable} from 'rxjs/Observable';*/

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

import {Agenda} from './agenda';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AgendaService {

    private options;
    private url = "http://54.68.202.167/arl-est";


    constructor(private http: Http) {
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',

        });
        this.options = new RequestOptions({headers: headers});
    }

    insertAgendaHour(hora: any, dia: any, idemp: any, idest: any) {
        let url = `${this.url}/iagen.php`;
        let data = JSON.stringify({hora, dia, idemp, idest});
        return this.http.post(url, data, this.options)
            .map(res => res.json())
            .catch(this.handleError);;
    }

    getAgenda(hora: any, dia: any, idper: any):Observable<Agenda[]> {
        let url = `${this.url}/sempag.php`;
        let data = JSON.stringify({hora, dia, idper});
        return this.http.post(url, data, this.options)
            .map(res => res.json())
            .catch(this.handleError);
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