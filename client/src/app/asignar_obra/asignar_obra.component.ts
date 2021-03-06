import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Paciente } from '../paciente/paciente';
import { PacienteService } from '../paciente/paciente.service';
import { ObraService } from '../obraSocial/obraSocial.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { ObraSocial } from '../obraSocial/obraSocial';
import { AsignarObraSocialService } from './asignar_obra.service';


@Component({
    selector: 'app-asignar-obraSocial',
    templateUrl: './asignar_obra.component.html',
    styleUrls: ['./asignar_obra.component.css'],
    animations: [routerTransition()]
})
export class AsignarObraComponent implements OnInit {

    model: any = {};
    pacientes: Paciente[] = [];
    colsPacientes: any[];
    selectedPaciente: Paciente;

    obraSociales: ObraSocial[] = [];
    colsObraSociales: any[];
    selectedObraSocial: ObraSocial;

    

  constructor(
    private pacienteService: PacienteService,
    private obraSocialService: ObraService,
    private asignarObraSocialService: AsignarObraSocialService
  ) {}


  ngOnInit() {
      this.getPacientes();

      this.colsPacientes = [
        { field: 'dni', header: 'DNI' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'direccion', header: 'Direccion' },
        { field: 'barrio', header: 'Barrio' },
      ];

      this.colsObraSociales = [
        { field: 'cuit', header: 'Cuit' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'direccion', header: 'Direccion' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'email', header: 'Email' }
      ];
  }

  getPacientes() {
    this.pacienteService.getPacientes()
    .then(pacientes => {
        this.pacientes = pacientes;
        console.log(pacientes);
    });
  }

  getObraSociales(event: any) {
    this.obraSocialService.getObraSocial()
      .then(obraSociales => {
          this.obraSociales = obraSociales;
          console.log(obraSociales);
      });
  }

  cargarObraSocial() {
    this.asignarObraSocialService.cargarObraSocial(this.selectedPaciente._id,this.selectedObraSocial._id).then(pacienteEditado => {
      // Muestro un mensajito de Actualizado con Éxito
      swal({
        title: 'Actualizado!',
        text: 'Se ha asignado la obra social correctamente.',
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
      this.selectedObraSocial = null;
      this.selectedPaciente = null;
    });;
  }

  
}

