import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Medico } from '../medico/medico';
import { MedicoService } from '../medico/medico.service';
import { ClinicaService } from '../clinica/clinica.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Clinica } from '../clinica/clinica';
import { AsignarClinicaService } from './asignar_clinica.service';


@Component({
    selector: 'app-asignar-clinica',
    templateUrl: './asignar_clinica.component.html',
    styleUrls: ['./asignar_clinica.component.css'],
    animations: [routerTransition()]
})
export class AsignarClinicaComponent implements OnInit {

    model: any = {};
    medicos: Medico[] = [];
    colsMedicos: any[];
    selectedMedico: Medico;

    clinicas: Clinica[] = [];
    colsClinicas: any[];
    selectedClinica: Clinica;

    

  constructor(
    private medicoService: MedicoService,
    private clinicaService: ClinicaService,
    private asignarClinicaService: AsignarClinicaService
  ) {}


  ngOnInit() {
      this.getMedicos();

      this.colsMedicos = [
        { field: 'dni', header: 'DNI' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'matricula', header: 'Matricula' }
      ];

      this.colsClinicas = [
        { field: 'cuit', header: 'Cuit' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'direccion', header: 'Direccion' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'email', header: 'Email' }
      ];
  }

  getMedicos() {
    this.medicoService.getMedicos()
    .then(medicos => {
        this.medicos = medicos;
    
    });
  }

  getClinicas(event: any) {
    this.clinicaService.getClinicas()
      .then(clinicas => {
          this.clinicas = clinicas;
       
      });
  }

  getClinicasNoAsignadasMedico(event: any) {
    this.clinicaService.getClinicasNoAsignadasMedico(this.selectedMedico._id)
      .then(clinicas => {
          this.clinicas = clinicas;

      });
  }

  cargarClinica() {
    this.asignarClinicaService.cargarClinica(this.selectedMedico._id,this.selectedClinica._id).then(pacienteEditado => {
      // Muestro un mensajito de Actualizado con Éxito
      swal({
        title: 'Actualizado!',
        text: 'Se ha asignado la clinica correctamente.',
        type: 'success',
        timer: 4000
      }).then(
        function () {
        },
        // handling the promise rejection
        function (dismiss) {
          if (dismiss === 'timer') {

          }
        }
      );


      // Reseteo el selectedPaciente y el formulario de editar
      this.selectedMedico = null;
      this.selectedClinica = null;
    });
  }

  
}

