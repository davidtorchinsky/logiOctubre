import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { Paciente } from './paciente';
import { default as swal } from 'sweetalert2';



@Injectable()
export class PacienteService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private pacienteURL = this.urlService.getRestApiUrl() + '/paciente';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getPacientes(): Promise<Paciente[]> {
        console.log(this.pacienteURL);
        return this.http.get(this.pacienteURL)
        .toPromise()
        .then(response => response.json().obj as Paciente[])
        .catch(this.handleError);
    }

    cargarPaciente(
        dniPac: string,
        nombrePac: string,
        apellidoPac: string,
        telefonoPac: string,
        direccionPac:string,
        barrioPac: string,
        fechaNacimientoPac: Date): Promise<Paciente> {

            

        return this.http.post(this.pacienteURL,
            JSON.stringify({dniPaciente: dniPac, nombrePaciente: nombrePac,
                apellidoPaciente: apellidoPac, telefonoPaciente: telefonoPac,direccionPaciente: direccionPac,
                barrioPaciente: barrioPac, fechaNacimientoPaciente: fechaNacimientoPac}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Paciente)
        .catch(this.handleError);
    }

    editarPaciente(
        idPac: string,
        nombrePac: string,
        apellidoPac: string,
        telefonoPac: string,
        direccionPac:string,
        barrioPac: string,
        fechaNacimientoPac: Date): Promise<Paciente> {
        return this.http.patch(this.pacienteURL + '/' + idPac,
            JSON.stringify({nombrePaciente: nombrePac,
                apellidoPaciente: apellidoPac, telefonoPaciente: telefonoPac,direccionPaciente: direccionPac,
                barrioPaciente: barrioPac,fechaNacimientoPaciente: fechaNacimientoPac}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Paciente)
        .catch(this.handleError);
    }

    deletePaciente(idPac: string): Promise<Paciente> {
        return this.http.delete(this.pacienteURL + '/' + idPac)
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
