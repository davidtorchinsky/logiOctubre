import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { HistorialPaciente } from './historial-paciente';
import { HistorialPacienteService } from './historial-paciente.service';
import { Paciente } from '../paciente/paciente';
import { PacienteService } from '../paciente/paciente.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-historial-paciente',
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.scss'],
  animations: [routerTransition()]
})
export class HistorialPacienteComponent implements OnInit {
  model: any = {};
  historialPacientes: HistorialPaciente[] = [];
  colPaciente: any[];
  colHistorial: any[];
  pacientes: Paciente[] = [];
  selectedPaciente: Paciente;
  selectedHistorial: HistorialPaciente;
  modalAgregarPaciente = false;
  modalEditarPaciente = false;
  modalEliminarPaciente = false;
  historial:HistorialPaciente;

  constructor(private HistorialPacienteService: HistorialPacienteService,
    private PacienteService: PacienteService) { 
  }

  ngOnInit() {
    this.getPacientes();

    this.colPaciente= [
      { field: 'dni', header: 'DNI' },       
      { field: 'nombre', header: 'Nombre' },       
      { field: 'apellido', header: 'Apellido' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'direccion', header: 'Direccion' },        
      { field: 'barrio', header: 'Barrio' },
      { field: 'fechaString', header: 'Fecha de Nacimiento' }
    ];

    this.colHistorial= [
      { field: 'dni', header: 'DNI' },       
      { field: 'nombre', header: 'Nombre' },       
      { field: 'apellido', header: 'Apellido' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'direccion', header: 'Direccion' },        
      { field: 'barrio', header: 'Barrio' },
      { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' },
      { field: 'fechaCambioString', header: 'Fecha del Cambio ' }
    ];
  }

   // GET pacientes, para que seleccione uno
   getPacientes() {

    this.PacienteService.getPacientes()
    .then(pacientes => {
        this.pacientes = pacientes;
        pacientes.forEach(paciente => {
          paciente.fechaString = paciente.fechaNacimiento.toLocaleString().slice(0,10);
        })
      
    });
  }

  //get del seleccionado
  getHistorialPaciente(event: any) {
    this.HistorialPacienteService.getHistorialPaciente(this.selectedPaciente.dni)
      .then(historialPacientes => {
          this.historialPacientes = historialPacientes;
      historialPacientes.forEach(historial =>{
          historial.fechaCambioString = historial.fechaCambio.toLocaleString().slice(0,10);

      })

  });

    // Reseteo el selectedPaciente y el formulario de editar
    this.selectedPaciente = null;
  }
}


