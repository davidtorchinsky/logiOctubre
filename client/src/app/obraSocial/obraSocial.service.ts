import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { ObraSocial } from './obraSocial';
import { default as swal } from 'sweetalert2';





@Injectable()
export class ObraService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private obraURL = this.urlService.getRestApiUrl() + '/obra';  // URL a la api
    
   

    constructor(
        private http: Http,
        private urlService: UrlService
        
    ) {}

    getObraSocial(): Promise<ObraSocial[]> {
        console.log(this.obraURL);
        return this.http.get(this.obraURL)
        .toPromise()
        .then(response => response.json().obj as ObraSocial[])
        .catch(this.handleError);
    }

    cargarObra(
        cuitOb: string,
        nombreOb: string,
        direccionOb: string,
        telefonoOb: string,
        emailOb: string): Promise<ObraSocial> {
            console.log('llame a cargar obra')

        return this.http.post(this.obraURL,
            JSON.stringify({cuitObraSocial: cuitOb, nombreObra: nombreOb,
                            direccionObra: direccionOb, telefonoObra: telefonoOb,
                            emailObra: emailOb}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as ObraSocial)
        .catch(this.handleError);
    }

    editarObra(
        idOb: string,
        nombreOb: string,
        direccionOb: string,
        emailOb: string,
        telefonoOb: string): Promise<ObraSocial> {

        return this.http.patch(this.obraURL + '/' + idOb,
            JSON.stringify({nombreObra: nombreOb,
                            direccionObra: direccionOb, telefonoObra: telefonoOb,
                            emailObra: emailOb}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as ObraSocial)
        .catch(this.handleError);
    }

    deleteObra(idOb: string): Promise<ObraSocial> {
        return this.http.delete(this.obraURL + '/' + idOb)
        .toPromise()
        .then(response => response.json().obj as ObraSocial)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de la Obra Social: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
