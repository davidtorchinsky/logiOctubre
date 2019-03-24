import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { HistorialPaciente } from './historial-paciente';
import { default as swal } from 'sweetalert2';



@Injectable()
export class HistorialPacienteService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private pacienteURL = this.urlService.getRestApiUrl() + '/historial_paciente';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

 

    getHistorialPaciente(dniPac: string,): Promise<HistorialPaciente[]> {
        console.log(dniPac+"AAAA    ");
        return this.http.get(this.pacienteURL  + '/' + dniPac)
        .toPromise()
        .then(response => response.json().obj as HistorialPaciente[])
        .catch(this.handleError);
    }

    cargarHistorialPaciente(
        idPac: string,
        dniPac: string,
        nombrePac: string,
        apellidoPac: string,
        telefonoPac: string,
        direccionPac:string,
        barrioPac: string,
        fechaCambioPac:Date,
        fechaNacimientoPac: Date): Promise<HistorialPaciente> {

            console.log("entre a cargarHistorialPaciente");
            console.log(dniPac,nombrePac);

        return this.http.post(this.pacienteURL,
            JSON.stringify({idPaciente:idPac,dniPaciente: dniPac, nombrePaciente: nombrePac,
                apellidoPaciente: apellidoPac, telefonoPaciente: telefonoPac,direccionPaciente: direccionPac,
                barrioPaciente: barrioPac, fechaNacimientoPaciente: fechaNacimientoPac,fechaCambioPaciente:fechaCambioPac}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as HistorialPaciente)
        .catch(this.handleError);
    }

    deleteHistorialPaciente(idHistorial: string): Promise<HistorialPaciente> {
        return this.http.delete(this.pacienteURL + '/' + idHistorial)
        .toPromise()
        .then(response => response.json().obj as HistorialPaciente)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Historial Pacientes: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
