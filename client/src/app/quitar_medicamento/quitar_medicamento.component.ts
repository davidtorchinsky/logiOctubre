import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Paciente } from '../paciente/paciente';
import { PacienteService } from '../paciente/paciente.service';
import { MedicamentoService } from '../medicamento/medicamento.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Medicamento } from '../medicamento/medicamento';
import { QuitarMedicamentoService } from './quitar_medicamento.service';
import { Pedido } from '../pedido/pedido';


@Component({
    selector: 'app-quitar-medicamento',
    templateUrl: './quitar_medicamento.component.html',
    styleUrls: ['./quitar_medicamento.component.css'],
    animations: [routerTransition()]
})
export class QuitarMedicamentoComponent implements OnInit {

    model: any = {};
    pacientes: Paciente[] = [];
    colsPacientes: any[];
    selectedPaciente: Paciente;

    medicamentos: Medicamento[] = [];
    colsMedicamentos: any[];
    selectedMedicamento: Medicamento;

    modalQuitarMedicamento = false;

  constructor(
    private pacienteService: PacienteService,
    private medicamentoService: MedicamentoService,
    private quitarMedicamentoService: QuitarMedicamentoService
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

  getMedicamentosPaciente(event: any) {
    console.log("entre a getmedicamentos component");
    this.medicamentoService.getMedicamentosPaciente(this.selectedPaciente)
      .then(medicamentos => {
          this.medicamentos = medicamentos;
          console.log(medicamentos);
      });
  }

  quitarConsumicion() {
    //this.cerrarModalQuitarMedicamento();

    this.quitarMedicamentoService.quitarConsumicion(this.selectedPaciente._id,
                                                    this.selectedMedicamento._id);

     //llamar cargar pedido service  
     //this.quitarMedicamentoService.quitarPedido(this.selectedPaciente._id, this.selectedMedicamento._id);                                             
  }

  mostrarModalQuitarMedicamento() {
    this.modalQuitarMedicamento = true;
  }

  cerrarModalQuitarMedicamento() {
    this.modalQuitarMedicamento = false;
  }
}

