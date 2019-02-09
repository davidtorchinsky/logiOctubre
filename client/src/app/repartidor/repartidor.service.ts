import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { Repartidor } from './repartidor';
import { default as swal } from 'sweetalert2';



@Injectable()
export class RepartidorService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private repartidorURL = this.urlService.getRestApiUrl() + '/repartidor';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getRepartidores(): Promise<Repartidor[]> {
        console.log(this.repartidorURL);
        return this.http.get(this.repartidorURL)
        .toPromise()
        .then(response => response.json().obj as Repartidor[])
        .catch(this.handleError);
    }

    cargarRepartidor(
        dniRep: string,
        nombreRep: string,
        apellidoRep: string,
        telefonoRep: string,
        legajoRep: string): Promise<Repartidor> {
            console.log(this.repartidorURL);
        return this.http.post(this.repartidorURL,
            JSON.stringify({dniRepartidor: dniRep, nombreRepartidor: nombreRep,
                            apellidoRepartidor: apellidoRep, telefonoRepartidor: telefonoRep,
                            legajoRepartidor: legajoRep}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Repartidor)
        .catch(this.handleError);
    }

    editarRepartidor(
        idRep: string,
        nombreRep: string,
        apellidoRep: string,
        telefonoRep: string,
        legajoRep: string): Promise<Repartidor> {
        return this.http.patch(this.repartidorURL + '/' + idRep,
            JSON.stringify({nombreRepartidor: nombreRep,
                            apellidoRepartidor: apellidoRep, telefonoRepartidor: telefonoRep,
                            legajoRepartidor: legajoRep}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Repartidor)
        .catch(this.handleError);
    }

    deleteRepartidor(idRep: string): Promise<Repartidor> {
        return this.http.delete(this.repartidorURL + '/' + idRep)
        .toPromise()
        .then(response => response.json().obj as Repartidor)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Repartidores: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
