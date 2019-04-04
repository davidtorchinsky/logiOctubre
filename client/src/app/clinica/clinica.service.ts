import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { default as swal } from 'sweetalert2';
import { Clinica } from './clinica';




@Injectable()
export class ClinicaService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private clinicaURL = this.urlService.getRestApiUrl() + '/clinica';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) {}

    getClinicas(): Promise<Clinica[]> {
        console.log(this.clinicaURL);
        return this.http.get(this.clinicaURL)
        .toPromise()
        .then(response => response.json().obj as Clinica[])
        .catch(this.handleError);
    }

    cargarClinica(
        cuitFar: string,
        nombreFar: string,
        direccionFar: string,
        telefonoFar: string,
        emailFar: string): Promise<Clinica> {
            console.log("entre al cargar de service");

            

        return this.http.post(this.clinicaURL,
            JSON.stringify({cuitClinica: cuitFar, nombreClinica: nombreFar,
            telefonoClinica: telefonoFar,direccionClinica: direccionFar,
                emailClinica: emailFar}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Clinica)
        .catch(this.handleError);
    }

    editarClinica(
        cuitFar: string,
        nombreFar: string,
        direccionFar: string,
        telefonoFar: string,
        emailFar: string): Promise<Clinica> {
        return this.http.patch(this.clinicaURL,
            JSON.stringify({cuitClinica: cuitFar, nombreClinica: nombreFar,
            telefonoClinica: telefonoFar,direccionClinica: direccionFar,
                emailClinica: emailFar}), {headers: this.headers})
        .toPromise()
        .then(response => response.json().obj as Clinica)
        .catch(this.handleError);
    }

    deleteClinica(idPac: string): Promise<Clinica> {
        return this.http.delete(this.clinicaURL + '/' + idPac)
        .toPromise()
        .then(response => response.json().obj as Clinica)
        .catch(this.handleError);
    }

    getClinicasNoAsignadasMedico(idMedico: string): Promise<Clinica[]> {
        
        return this.http.get(this.clinicaURL+ '/noAsignada' +'/'+ idMedico)
        .toPromise()
        .then(response => response.json().obj as Clinica[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Clinicas: ', error);
            swal(
                'Error!',
                error.json().error,
                'error'
            );
        return Promise.reject(error.message || error);
    }
}
