import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { Medicamento } from './medicamento';
import { default as swal } from 'sweetalert2';
import { Paciente } from '../paciente/paciente';
//import {medico2} from '../consultas/medicoConsultas.js';



@Injectable()
export class MedicamentoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private medicamentoURL = this.urlService.getRestApiUrl() + '/medicamento';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getMedicamentos(): Promise<Medicamento[]> {
        console.log(this.medicamentoURL);
        return this.http.get(this.medicamentoURL)
        .toPromise()
        .then(response => response.json().obj as Medicamento[])
        .catch(this.handleError);
    }

    getMedicamentosPaciente(paciente: Paciente): Promise<Medicamento[]> {
        console.log(this.medicamentoURL);
        return this.http.get(this.medicamentoURL+ '/' + paciente._id)
        .toPromise()
        .then(response => response.json().obj as Medicamento[])
        .catch(this.handleError);
    }

    cargarMedicamento(
        idMedMedicam: string,
        nombreMedMedicam: string,
        dosisMedMedicam: string,
        cadenaDeFrioMedMedicam: string,
        laboratorioMedicam:string,
        cantidadComprimidosMedicam: string): Promise<Medicamento> {

            console.log("CantCompromidos:");
            console.log(cantidadComprimidosMedicam);

        return this.http.post(this.medicamentoURL,
            JSON.stringify({idMedicamento: idMedMedicam, nombreMedicamento: nombreMedMedicam,
                dosisMedicamento: dosisMedMedicam, cadenaFrioMedicamento: cadenaDeFrioMedMedicam,laboratorioMedicamento: laboratorioMedicam,
                cantidadComprimidosMedicamento: cantidadComprimidosMedicam}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Medicamento)
        .catch(this.handleError);
    }

    editarMedicamento(
        idMedMedicam: string,
        nombreMedMedicam: string,
        dosisMedMedicam: string,
        cadenaDeFrioMedMedicam: string,
        laboratorioMedicam:string,
        cantidadComprimidosMedicam: string): Promise<Medicamento> {
        return this.http.patch(this.medicamentoURL + '/' + idMedMedicam,
            JSON.stringify({idMedicamento:idMedMedicam, nombreMedicamento: nombreMedMedicam,
                dosisMedicamento: dosisMedMedicam, cadenaFrioMedicamento: cadenaDeFrioMedMedicam,laboratorioMedicamento: laboratorioMedicam,
                cantidadComprimidosMedicamento: cantidadComprimidosMedicam}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Medicamento)
        .catch(this.handleError);
    }

    deleteMedicamento(idMedMedicam: string): Promise<Medicamento> {
        return this.http.delete(this.medicamentoURL + '/' + idMedMedicam)
        .toPromise()
        .then(response => response.json().obj as Medicamento)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Medicamentos: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
