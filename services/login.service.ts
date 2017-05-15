/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

    url = "http://54.68.202.167/arl-est";

    constructor(private http: Http) {
    }

    logear(data) {
        let url = `${this.url}/login.php`;
        return this.http.post(url, data)
            .map(res => res.json())
    }

    logout(): void {
        localStorage.removeItem('nombres');
        localStorage.removeItem('establec');
    }

}