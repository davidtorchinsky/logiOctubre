import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';

import 'rxjs/add/operator/toPromise';

import { default as swal } from 'sweetalert2';

@Injectable()
export class AlertErrorService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private plantaURL = this.urlService.getRestApiUrl() + '/planta';  // URL to web api


    constructor(
        private http: Http,
        private urlService: UrlService) { }

    handleError(nombreClase: string, error: any): Promise<any> {
        console.error('Ocurrio un error en servicio de ' + nombreClase + ': ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
