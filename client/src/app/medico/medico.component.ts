import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import swal from 'sweetalert2';

import { Medico } from './medico';
import { MedicoService } from './medico.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-productos',
    templateUrl: './medico.component.html',
    styleUrls: ['./medico.component.css'],
    animations: [routerTransition()]
})
export class MedicoComponent implements OnInit {
  model: any = {};
  medicos: Medico[];
  cols: any[];
  selectedMedico;
  modalAgregarMedico = false;

  constructor(
    private medicoService: MedicoService
  ) {
      this.medicos = [
        {_id: '01', dni: '1234', nombre: 'John', apellido: 'Doe', telefono: '0800-1234-456', matricula: 'hola1'},
        {_id: '02', dni: '12345', nombre: 'Anna', apellido: 'Smith',  telefono: '0800-1234-456', matricula: 'hola2'},
        {_id: '03', dni: '123456', nombre: 'Peter', apellido: 'Jones',  telefono: '0800-1234-456', matricula: 'hola3'}
      ];

      this.cols = [
        { field: 'dni', header: 'DNI' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'matricula', header: 'Matricula' }
      ];
  }


  ngOnInit() {
  }

  getMedicos() {
    this.medicoService.getMedicos()
    .then(medicos => {
        this.medicos = medicos;
    });
  }

  cargarMedico(
    dniMedico: string,
    nombreMedico: string,
    apellidoMedico: string,
    telefonoMedico: string,
    matriculaMedico: string,
    f: NgForm) {

    this.modalAgregarMedico = false;

    this.medicoService.saveMedico(dniMedico,nombreMedico,apellidoMedico,telefonoMedico,matriculaMedico);

    f.resetForm();
  }

  mostrarModalAgregarMedico() {
    this.modalAgregarMedico = true;
  }

}
