import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { default as swal } from 'sweetalert2';
import { Medico } from '../medico/medico';

@Injectable()
export class AsignarClinicaService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private medicoURL = this.urlService.getRestApiUrl() + '/medico';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    cargarClinica(idMedico: string, idClinica: string): Promise <Medico> {
        console.log("entre a service asignar clinica/n " + this.medicoURL + '/'+ 'agregarClinica/' + idMedico + '/' + idClinica);
        
        return this.http.patch(this.medicoURL + '/'+ 'agregarClinica/' + idMedico + '/' + idClinica,
            JSON.stringify({}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Medico)
        .catch(this.handleError);
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
