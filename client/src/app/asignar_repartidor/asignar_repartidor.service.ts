import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { default as swal } from 'sweetalert2';
import { Pedido } from '../pedido/pedido';

@Injectable()
export class AsignarRepartidorService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private pedidoURL = this.urlService.getRestApiUrl() + '/pedido';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    cargarRepartidor(idPedido: string, idRepartidor: string): Promise <Pedido> {
        
        return this.http.patch(this.pedidoURL + '/'+'agregarRepartidor/'  + idPedido + '/' + idRepartidor,
            JSON.stringify({}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Pedido)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Pedidos: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
