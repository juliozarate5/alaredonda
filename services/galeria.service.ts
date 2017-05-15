/*
 *    Project:	alaRedonda-establecimientos
 *    Version:	1.0.0
 *    Date:		16/03/2017 08:29:49 PM
 *    Author:	julio.martinez@parasuempresa.com
 *
 *    Coded with Netbeans!
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Galeria} from './galeria';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class GaleriaService {

    private options;
    private url = "http://54.68.202.167/arl-est";
        
    constructor(private http: Http) {

        let headers = new Headers({
            'Content-Type': 'application/json',
        });
        this.options = new RequestOptions({ headers: headers});
    }

    getGaleria(idest: any): Observable<Galeria[]> {
        let url = `${this.url}/sgal.php`;
        let data =  JSON.stringify({idest});
        return this.http.post(url, data, this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }
    
    getGaleriaOne(idest: any, idgal: any): Observable<Galeria[]> {
        let url = `${this.url}/sgalo.php`;
        let data =  JSON.stringify({idest, idgal});
        return this.http.post(url, data, this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }
    
    insertGaleria(galeria: any){
        let url = `${this.url}/igal.php`;
        let iJson = JSON.stringify(galeria);
        return  this.http.post(url, iJson, this.options)
        .map(res => res.json())
        .catch(this.handleError);;
    }
    
    deleteGaleria(id: number, val: string){
        let url = `${this.url}/dgal.php`;
        let iJson = JSON.stringify({id, val});
        return this.http.post(url, iJson,this.options)
        .map(res => res.json())
        .catch(this.handleError);;
    }
    
    updateGaleria(idE: any, id: number, img: string){
        let url = `${this.url}/agal.php`;
        let data =  JSON.stringify({idE, id, img});
        return this.http.post(url, data, this.options)
        .map(res => res.json())
        .catch(this.handleError);;
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