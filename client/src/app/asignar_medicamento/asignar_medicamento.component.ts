import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Paciente } from '../paciente/paciente';
import { PacienteService } from '../paciente/paciente.service';
import { MedicamentoService } from '../medicamento/medicamento.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Medicamento } from '../medicamento/medicamento';
import { AsignarMedicamentoService } from './asignar_medicamento.service';


@Component({
    selector: 'app-asignar-medicamento',
    templateUrl: './asignar_medicamento.component.html',
    styleUrls: ['./asignar_medicamento.component.css'],
    animations: [routerTransition()]
})
export class AsignarMedicamentoComponent implements OnInit {

    model: any = {};
    pacientes: Paciente[] = [];
    colsPacientes: any[];
    selectedPaciente: Paciente;

    medicamentos: Medicamento[] = [];
    colsMedicamentos: any[];
    selectedMedicamento: Medicamento;

    modalAsignarMedicamento = false;

  constructor(
    private pacienteService: PacienteService,
    private medicamentoService: MedicamentoService,
    private asignarMedicamentoService: AsignarMedicamentoService
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

      this.colsMedicamentos = [
        { field: 'idMedicamento', header: 'Id Medicamento' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'dosis', header: 'Dosis' },
        { field: 'cadenaFrio', header: 'Cadena Frio' },
        { field: 'laboratorio', header: 'Laboratorio' },
        { field: 'cantidadComprimidos', header: 'Cantidad Comprimidos' }
      ];
  }

  getPacientes() {
    this.pacienteService.getPacientes()
    .then(pacientes => {
        this.pacientes = pacientes;
        console.log(pacientes);
    });
  }

  getMedicamentos(event: any) {
    this.medicamentoService.getMedicamentos()
      .then(medicamentos => {
          this.medicamentos = medicamentos;
          console.log(medicamentos);
      });
  }

  cargarConsumicion(frecuencia: number, cantComp: number, f: NgForm) {
    this.cerrarModalAsignarMedicamento();

    this.asignarMedicamentoService.cargarConsumicion(this.selectedPaciente._id,
                                                    this.selectedMedicamento._id,
                                                    frecuencia,
                                                    cantComp);
  }

  mostrarModalAsignarMedicamento() {
    this.modalAsignarMedicamento = true;
  }

  cerrarModalAsignarMedicamento() {
    this.modalAsignarMedicamento = false;
  }
}
