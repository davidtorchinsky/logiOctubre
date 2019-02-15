import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { default as swal } from 'sweetalert2';
import { Paciente } from '../paciente/paciente';

@Injectable()
export class AsignarMedicamentoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private pacienteURL = this.urlService.getRestApiUrl() + '/paciente';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    cargarConsumicion(idPaciente: string, idMedicamento: string, frec: number, cantC: number): Promise <Paciente> {
        return this.http.patch(this.pacienteURL + '/' + idPaciente + '/' + idMedicamento,
            JSON.stringify({frecuencia: frec, cantidadConsumicion: cantC}), {headers: this.headers})
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
