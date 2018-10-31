import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { Medico } from './medico';
import { default as swal } from 'sweetalert2';

@Injectable()
export class MedicoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private medicoURL = this.urlService.getRestApiUrl() + '/medico';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getMedicos(): Promise<Medico[]> {
        return this.http.get(this.medicoURL)
        .toPromise()
        .then(response => response.json().obj as Medico[])
        .catch(this.handleError);
    }

    getMedico() {

    }

    updateMedico() {

    }

    saveMedico() {

    }

    deleteMedico() {

    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Medicos: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
