import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { default as swal } from 'sweetalert2';
import { Paciente } from '../paciente/paciente';
import { Pedido} from '../pedido/pedido';

@Injectable()
export class AsignarMedicamentoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private pacienteURL = this.urlService.getRestApiUrl() + '/paciente';  // URL a la api
    private pedidoURL= this.urlService.getRestApiUrl() + '/pedido';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    cargarConsumicion(idPaciente: string, idMedicamento: string, frec: number, cantC: number): Promise <Paciente> {
        
        return this.http.patch(this.pacienteURL + '/'+'agregarMedicamento/'  + idPaciente + '/' + idMedicamento,
            JSON.stringify({frecuencia: frec, cantidadConsumicion: cantC}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Paciente)
        .catch(this.handleError);
    }
    //asignar pedido
    cargarPedido(idPaciente: string, idMedicamento: string): Promise <Pedido>{
        return this.http.patch(this.pedidoURL + '/'+'agregarPedido/'  + idPaciente + '/' + idMedicamento,
        JSON.stringify({}), {headers: this.headers})
    .toPromise()
    .then(response => response.json().obj as Paciente)
    .catch(this.handleError); 
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Pacientes: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
