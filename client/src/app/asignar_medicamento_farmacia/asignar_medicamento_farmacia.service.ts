import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { default as swal } from 'sweetalert2';
import { Farmacia } from '../farmacia/farmacia';

@Injectable()
export class AsignarMedicamentoFarmaciaService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private farmaciaURL = this.urlService.getRestApiUrl() + '/farmacia';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    cargarConsumicion(idFarmacia: string, idMedicamento: string): Promise <Farmacia> {
        
        return this.http.patch(this.farmaciaURL + '/'+'agregarMedicamento/'  + idFarmacia + '/' + idMedicamento,
            JSON.stringify({}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Farmacia)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Asignar Medicamento Farmacias: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
