import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
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
  medicos: Medico[] = [];
  cols: any[];
  selectedMedico: Medico;
  modalAgregarMedico = false;
  modalEditarMedico = false;
  modalEliminarMedico = false;


  constructor(
    private medicoService: MedicoService
  ) {}


  ngOnInit() {
      this.getMedicos();

      this.cols = [
        { field: 'dni', header: 'DNI' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'matricula', header: 'Matricula' }
      ];
  }

  getMedicos() {

    const medico1 = new Medico();
    medico1._id = '01';
    medico1.dni = '1234';
    medico1.nombre = 'John';
    medico1.apellido = 'Doe';
    medico1.telefono = '0800-1234-456';
    medico1.matricula = 'hola1';

    const medico2 = new Medico();
    medico2._id = '02';
    medico2.dni = '12345';
    medico2.nombre = 'Anna';
    medico2.apellido = 'Smith';
    medico2.telefono = '0800-1234-456';
    medico2.matricula = 'hola2';

    const medico3 = new Medico();
    medico3._id = '03';
    medico3.dni = '123456';
    medico3.nombre = 'Peter';
    medico3.apellido = 'Jones';
    medico3.telefono = '0800-1234-456';
    medico3.matricula = 'hola3';

    this.medicos.push(medico1, medico2, medico3);

    /*this.medicoService.getMedicos()
    .then(medicos => {
        this.medicos = medicos;
    });*/
  }

  cargarMedico(
    dniMedico: string,
    nombreMedico: string,
    apellidoMedico: string,
    telefonoMedico: string,
    matriculaMedico: string,
    f: NgForm) {
    this.modalAgregarMedico = false;
    this.medicoService.saveMedico(dniMedico, nombreMedico, apellidoMedico, telefonoMedico, matriculaMedico);

    f.resetForm();
  }

  updateMedico(
    dniMedico: string,
    nombreMedico: string,
    apellidoMedico: string,
    telefonoMedico: string,
    matriculaMedico: string,
    f: NgForm
  ) {
    this.medicos.forEach(medico => {
      if (medico._id === this.selectedMedico._id) {
        medico.dni = this.selectedMedico.dni;
        medico.nombre = this.selectedMedico.nombre;
        medico.apellido = this.selectedMedico.apellido;
        medico.matricula = this.selectedMedico.matricula;
      }
    });

    this.selectedMedico = null;
    f.resetForm();
  }

  mostrarModalAgregarMedico() {
    this.modalAgregarMedico = true;
  }

 mostrarModalEditar() {
    if (this.selectedMedico != null) {
      console.log('MEDICO: ' + this.selectedMedico.dni);
       this.modalEditarMedico = true;
    }

  }

  cerrarModalEditar() {
    this.modalEditarMedico = false;
  }

   mostrarModalEliminar(
     medico: Medico
   ) {
    if (medico != null) {
       this.modalEliminarMedico = true;
    }

  }

  eliminarMedico(
    medicoDelete: Medico
  ) {
    this.medicoService.deleteMedico(medicoDelete.dni);
    this.modalEliminarMedico = false;

  }

}

