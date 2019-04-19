import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { Pedido } from '../pedido/pedido';
import { default as swal } from 'sweetalert2';
import { Paciente} from '../paciente/paciente';



@Injectable()
export class PedidoEntregadoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private pedidoURL = this.urlService.getRestApiUrl() + '/pedido';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}
        //me conecto a la base de datos
    getPedidos(): Promise<Pedido[]> {
        return this.http.get(this.pedidoURL+ '/'+'entregado/')
        .toPromise()
        .then(response => response.json().obj as Pedido[])//coneccion con exito
        .catch(this.handleError);//obtento el error en caso de que se produzca uno
    }


    getPacientes(): Promise<Paciente[]> { 
        return this.http.get(this.pedidoURL)
        .toPromise()
        .then(response => response.json().obj as Pedido[])//coneccion con exito
        .catch(this.handleError);//obtento el error en caso de que se produzca uno
    }

    cargarPedido(
        numeroPed: Number,
        estadoPed: String,
        horaYFechaPed: Date,
        cadenaDeFrioPed: String,
        idPacientePed: String,        
        idMedicamentoPed: String,
        ): Promise<Pedido> {
            console.log("entre a cagar pedido");
        return this.http.post(this.pedidoURL,
            JSON.stringify({numeroPedido: numeroPed, estadoPedido: estadoPed,
                            horaYFechaPedido: horaYFechaPed, cadenaFrioPedido: 
                            cadenaDeFrioPed, idPacientePedido: idPacientePed,                            
                            idMedicamentoPedido: idMedicamentoPed,
                            }), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Pedido)
        .catch(this.handleError);
    }

    editarPedido(
        idPed: String,
        estadoPed: String,
        horaYFechaPed: Date
     ): Promise<Pedido> {
            console.log("entre a pedido service editar");
        return this.http.patch(this.pedidoURL + '/' + idPed,
            JSON.stringify({estadoPedido: estadoPed,
                horaYFechaPedido: horaYFechaPed}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Pedido)
        .catch(this.handleError);
    }

    deletePedido(idPed: String): Promise<Pedido> {
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
