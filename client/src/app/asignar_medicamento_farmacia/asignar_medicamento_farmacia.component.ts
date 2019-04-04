import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Farmacia } from '../farmacia/farmacia';
import { FarmaciaService } from '../farmacia/farmacia.service';
import { MedicamentoService } from '../medicamento/medicamento.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Medicamento } from '../medicamento/medicamento';
import { AsignarMedicamentoFarmaciaService } from './asignar_medicamento_farmacia.service';


@Component({
    selector: 'app-asignar-medicamento',
    templateUrl: './asignar_medicamento_farmacia.component.html',
    styleUrls: ['./asignar_medicamento_farmacia.component.css'],
    animations: [routerTransition()]
})
export class AsignarMedicamentoFarmaciaComponent implements OnInit {

    model: any = {};
    farmacias: Farmacia[] = [];
    colsFarmacias: any[];
    selectedFarmacia: Farmacia;

    medicamentos: Medicamento[] = [];
    colsMedicamentos: any[];
    selectedMedicamento: Medicamento;

    modalAsignarMedicamento = false;

  constructor(
    private farmaciaService: FarmaciaService,
    private medicamentoService: MedicamentoService,
    private asignarMedicamentoService: AsignarMedicamentoFarmaciaService
  ) {}


  ngOnInit() {
      this.getFarmacias();

      this.colsFarmacias = [
        { field: 'cuit', header: 'Cuit' },       
        { field: 'nombre', header: 'Nombre' },       
        { field: 'telefono', header: 'Telefono' },
        { field: 'direccion', header: 'Direccion' },        
        { field: 'email', header: 'Email' }
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

  getFarmacias() {
    this.farmaciaService.getFarmacias()
    .then(farmacias => {
        this.farmacias = farmacias;
        console.log(farmacias);
    });
  }

  getMedicamentos(event: any) {
    this.medicamentoService.getMedicamentosNoFarmacia(this.selectedFarmacia._id)
      .then(medicamentos => {
          this.medicamentos = medicamentos;
          console.log(medicamentos);
      });
  }
  
  cargarMedicamento() {
    this.asignarMedicamentoService.cargarConsumicion(this.selectedFarmacia._id,
      this.selectedMedicamento._id).then(pacienteEditado => {
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
        this.selectedMedicamento = null;
        this.selectedFarmacia = null;
      });;
  }

  mostrarModalAsignarMedicamento() {
    this.modalAsignarMedicamento = true;
  }

  cerrarModalAsignarMedicamento() {
    this.modalAsignarMedicamento = false;
  }
}

