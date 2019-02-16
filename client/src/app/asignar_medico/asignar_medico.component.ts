import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Paciente } from '../paciente/paciente';
import { PacienteService } from '../paciente/paciente.service';
import { MedicoService } from '../medico/medico.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Medico } from '../medico/medico';
import { AsignarMedicoService } from './asignar_medico.service';


@Component({
    selector: 'app-asignar-medico',
    templateUrl: './asignar_medico.component.html',
    styleUrls: ['./asignar_medico.component.css'],
    animations: [routerTransition()]
})
export class AsignarMedicoComponent implements OnInit {

    model: any = {};
    pacientes: Paciente[] = [];
    colsPacientes: any[];
    selectedPaciente: Paciente;

    medicos: Medico[] = [];
    colsMedicos: any[];
    selectedMedico: Medico;

    

  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private asignarMedicoService: AsignarMedicoService
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
        { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' }
      ];

      this.colsMedicos = [
        { field: 'dni', header: 'DNI' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'matricula', header: 'Matricula' }
      ];
  }

  getPacientes() {
    this.pacienteService.getPacientes()
    .then(pacientes => {
        this.pacientes = pacientes;
        console.log(pacientes);
    });
  }

  getMedicos(event: any) {
    this.medicoService.getMedicos()
      .then(medicos => {
          this.medicos = medicos;
          console.log(medicos);
      });
  }

  cargarMedico(frecuencia: number, cantComp: number, f: NgForm) {
   

    this.asignarMedicoService.cargarMedico(this.selectedPaciente._id,
                                                    this.selectedMedico._id);
  }

  
}

