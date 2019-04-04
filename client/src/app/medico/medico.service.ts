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
        console.log(this.medicoURL);
        return this.http.get(this.medicoURL)
        .toPromise()
        .then(response => response.json().obj as Medico[])
        .catch(this.handleError);
    }

    getMedicosNoPaciente(idPaciente: string): Promise<Medico[]> {
        console.log(this.medicoURL);
        return this.http.get(this.medicoURL+ '/noPaciente' +'/'+ idPaciente)
        .toPromise()
        .then(response => response.json().obj as Medico[])
        .catch(this.handleError);
    }

    cargarMedico(
        dniMed: string,
        nombreMed: string,
        apellidoMed: string,
        telefonoMed: string,
        matriculaMed: string,
        especialidadMed: string): Promise<Medico> {
            console.log(this.medicoURL);
        return this.http.post(this.medicoURL,
            JSON.stringify({dniMedico: dniMed, nombreMedico: nombreMed,
                            apellidoMedico: apellidoMed, telefonoMedico: telefonoMed,
                            matriculaMedico: matriculaMed, especialidadMedico: especialidadMed}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Medico)
        .catch(this.handleError);
    }

    editarMedico(
        idMed: string,
        nombreMed: string,
        apellidoMed: string,
        telefonoMed: string,
        matriculaMed: string,
        especialidadMed: string): Promise<Medico> {
        return this.http.patch(this.medicoURL + '/' + idMed,
            JSON.stringify({nombreMedico: nombreMed,
                            apellidoMedico: apellidoMed, telefonoMedico: telefonoMed,
                            matriculaMedico: matriculaMed,especialidadMedico: especialidadMed}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Medico)
        .catch(this.handleError);
    }

    deleteMedico(idMed: string): Promise<Medico> {
        return this.http.delete(this.medicoURL + '/' + idMed)
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
