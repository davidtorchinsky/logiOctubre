import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Paciente } from '../paciente/paciente';
import { PacienteService } from '../paciente/paciente.service';
import { MedicamentoService } from '../medicamento/medicamento.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Medicamento } from '../medicamento/medicamento';
import { AsignarMedicamentoService } from './asignar_medicamento.service';
import { Pedido } from '../pedido/pedido';


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

  getMedicamentosNoConsumePaciente(event: any) {
    this.medicamentoService.getMedicamentosNoConsumePaciente(this.selectedPaciente._id)
      .then(medicamentos => {
          this.medicamentos = medicamentos;
       
       
      });
  }

  cargarConsumicion(frecuencia: number, cantComp: number, f: NgForm) {
    this.cerrarModalAsignarMedicamento();

    this.asignarMedicamentoService.cargarConsumicion(this.selectedPaciente._id,
                                                    this.selectedMedicamento._id,
                                                    frecuencia,
                                                    cantComp,
                                                    this.selectedMedicamento.idMedicamento,).then(pacienteEditado => {
                                                      // Muestro un mensajito de Actualizado con Éxito
                                                      swal({
                                                        title: 'Actualizado!',
                                                        text: 'Se ha asignado el medicamento correctamente.',
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
                                                      this.selectedPaciente = null;
                                                      this.selectedMedicamento = null;
                                                    });;

     //llamar cargar pedido service  revisar bien
     this.asignarMedicamentoService.cargarPedido(this.selectedPaciente._id, this.selectedMedicamento._id);                                             
 
    
 
    }

  mostrarModalAsignarMedicamento() {
    this.modalAsignarMedicamento = true;
  }

  cerrarModalAsignarMedicamento() {
    this.modalAsignarMedicamento = false;
  }
}

