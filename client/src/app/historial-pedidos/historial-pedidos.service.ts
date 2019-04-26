import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { HistorialPedidos } from './historial-pedidos';
import { default as swal } from 'sweetalert2';



@Injectable()
export class HistorialPedidosService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private pedidoURL = this.urlService.getRestApiUrl() + '/historial_pedidos';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

 

    getHistorialPedidos(idPed: string,): Promise<HistorialPedidos[]> {
    
      
        return this.http.get(this.pedidoURL  + '/' + idPed)
        .toPromise()
        .then(response => response.json().obj as HistorialPedidos[])
        .catch(this.handleError);
    }

    cargarHistorialPedidos(
        idPed: string,
        numeroPed: Number,
        estadoNue:String,
        nombrePac: string,
        apellidoPac: string,
        direccionPac:string,
        barrioPac: string,
        fechaCambioPac:Date,
    //    idRep:string,
        idMed:string,
        idPac:string,
        estadoAnte:string,
        ): Promise<HistorialPedidos> {

            console.log("entre a cargar historial pedidos");
            console.log(numeroPed);
            console.log("id pedido : "+idPed);
            console.log("id Paciente: "+idPac);

        return this.http.post(this.pedidoURL,
            JSON.stringify({idPedido:idPed,numeroPedido: numeroPed, estadoNuevo: estadoNue,nombrePaciente:nombrePac,
                apellidoPaciente: apellidoPac,direccionPaciente: direccionPac,
                barrioPaciente: barrioPac,fechaCambioPedido:fechaCambioPac,idPaciente:idPac,idMedicamento:idMed, estadoAnterior:estadoAnte}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as HistorialPedidos)
        .catch(this.handleError);
    }

    deleteHistorialPedidos(idHistorial: string): Promise<HistorialPedidos> {
        return this.http.delete(this.pedidoURL + '/' + idHistorial)
        .toPromise()
        .then(response => response.json().obj as HistorialPedidos)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Historial Pedidos: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
