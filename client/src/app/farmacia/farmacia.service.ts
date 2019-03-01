import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { default as swal } from 'sweetalert2';
import { Farmacia } from './farmacia';




@Injectable()
export class FarmaciaService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private farmaciaURL = this.urlService.getRestApiUrl() + '/farmacia';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getFarmacias(): Promise<Farmacia[]> {
      
        return this.http.get(this.farmaciaURL)
        .toPromise()
        .then(response => response.json().obj as Farmacia[])
        .catch(this.handleError);
    }

    cargarFarmacia(
        cuitFar: string,
        nombreFar: string,
        direccionFar: string,
        telefonoFar: string,
        emailFar: string): Promise<Farmacia> {

            

        return this.http.post(this.farmaciaURL,
            JSON.stringify({cuitFarmacia: cuitFar, nombreFarmacia: nombreFar,
            telefonoFarmacia: telefonoFar,direccionFarmacia: direccionFar,
                emailFarmacia: emailFar}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Farmacia)
        .catch(this.handleError);
    }

    editarFarmacia(
        cuitFar: string,
        nombreFar: string,
        direccionFar: string,
        telefonoFar: string,
        emailFar: string): Promise<Farmacia> {
        return this.http.patch(this.farmaciaURL,
            JSON.stringify({cuitFarmacia: cuitFar, nombreFarmacia: nombreFar,
            telefonoFarmacia: telefonoFar,direccionFarmacia: direccionFar,
                emailFarmacia: emailFar}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Farmacia)
        .catch(this.handleError);
    }

    deleteFarmacia(idPac: string): Promise<Farmacia> {
        return this.http.delete(this.farmaciaURL + '/' + idPac)
        .toPromise()
        .then(response => response.json().obj as Farmacia)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Farmacias: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
