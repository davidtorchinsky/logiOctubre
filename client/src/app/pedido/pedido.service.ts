import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { Pedido } from './pedido';
import { default as swal } from 'sweetalert2';



@Injectable()
export class PedidoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private pedidoURL = this.urlService.getRestApiUrl() + '/pedido';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getPedidos(): Promise<Pedido[]> {
        console.log(this.pedidoURL);
        return this.http.get(this.pedidoURL)
        .toPromise()
        .then(response => response.json().obj as Pedido[])
        .catch(this.handleError);
    }

    cargarPedido(
        numeroPed: string,
        estadoPed: string,
        horaYFechaPed: Date,
        cadenaDeFrioPed: string): Promise<Pedido> {
        return this.http.post(this.pedidoURL,
            JSON.stringify({numeroPedido: numeroPed, estadoPedido: estadoPed,
                            horaYFechaPedido: horaYFechaPed, cadenaFrioPedido: 
                            cadenaDeFrioPed}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Pedido)
        .catch(this.handleError);
    }

    editarPedido(
        idPed: string,
        estadoPed: string,
        horaYFechaPed: Date,
        cadenaDeFrioPed: string): Promise<Pedido> {
        return this.http.patch(this.pedidoURL + '/' + idPed,
            JSON.stringify({estadoPedido: estadoPed,
                horaYFechaPedido: horaYFechaPed, cadenaFrioPedido: cadenaDeFrioPed}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Pedido)
        .catch(this.handleError);
    }

    deletePedido(idPed: string): Promise<Pedido> {
        return this.http.delete(this.pedidoURL + '/' + idPed)
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
