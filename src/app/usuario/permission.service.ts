import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Usuario} from './usuario';
//import {Config} from '../config';
import {Permission} from './permission';
import { UrlService } from '../window.provider.service';

@Injectable()
export class PermissionService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private permissionURL = this.urlService.getRestApiUrl() + '/permission';  // URL to web api
    constructor(private http: Http,
                private urlService: UrlService) { }

    getPermissions(): Promise<Permission[]> {
        return this.http.get(this.permissionURL, this.jwt())
        .toPromise()
        .then(response => {
            return response.json() as Permission[];
        })
        .catch(this.handleError);
    }

    create(Usuario: Usuario) {
        return this.http.post('/api/Usuarios', Usuario, this.jwt()).map((response: Response) => response.json());
    }

    public jwt(): RequestOptions {
        // create authorization header with jwt token
        const currentUsuario = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUsuario && currentUsuario.token) {
            const headers2 = new Headers({ 'Authorization': 'Bearer ' + currentUsuario.token });
            return new RequestOptions({ headers: headers2 });
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en servicio de OatRegs: ', error);
        alert(error.json().error);
        return Promise.reject(error.message || error);
    }
}
