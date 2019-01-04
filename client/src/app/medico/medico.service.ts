import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { Medico } from './medico';
import { default as swal } from 'sweetalert2';



@Injectable()
export class MedicoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private medicoURL = this.urlService.getRestApiUrl() + '/medico';  // URL a la api
    private urltest = '/app/config-bd/medicoServer';


    
    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getMedicos(): Promise<Medico[]> {
        console.log(this.urltest);
        console.log(this.medicoURL);
        return this.http.get(this.urltest)
        .toPromise()
        .then(response => response.json().obj as Medico[])
        .catch(this.handleError);
    }
/**
   getTodosLosMedicos(): Medico[]
    {   
        return this.medico;
    }

    getMedico() {

    }

    updateMedico() {

    }
     * 
 */ 

    saveMedico(
        dniMed: string,
        nombreMed: string,
        apellidoMed: string,
        telefonoMed: string,
        matriculaMed: string) {

        return this.http.post(this.medicoURL,
            JSON.stringify({dniMedico: dniMed, nombreMedico: nombreMed,
                            apellidoMedico: apellidoMed, telefonoMedico: telefonoMed,
                            matriculaMedico: matriculaMed}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Medico[])
        .catch(this.handleError);
    }

    deleteMedico(
        dniMed: string
    ) {


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
