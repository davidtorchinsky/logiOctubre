import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Medicamento } from './medicamento';
import { MedicamentoService } from './medicamento.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    templateUrl: './medicamento.component.html',
    styleUrls: ['./medicamento.component.css'],
    animations: [routerTransition()]
})
export class MedicamentoComponent implements OnInit {
  model: any = {};
  medicamentos: Medicamento[] = [];
  cols: any[];
  selectedMedicamento: Medicamento;
  modalAgregarMedicamento = false;
  modalEditarMedicamento = false;
  modalEliminarMedicamento = false;
  cadena:string = "";


  constructor(
    private medicamentoService: MedicamentoService
  ) {}


  ngOnInit() {
      this.getMedicamentos();

      this.cols = [
        { field: 'idMedicamento', header: 'Id Medicamento' },
        { field: 'nombre', header: 'Nombre' },       
        { field: 'dosis', header: 'Dosis' },
        { field: 'cadenaFrio', header: 'Cadena Frio' },
        { field: 'laboratorio', header: 'Laboratorio' },
        { field: 'cantidadComprimidos', header: 'Cantidad Comprimidos' }
      ];
  }

  // GET MEDICAMENTOS
    getMedicamentos() {
      this.medicamentoService.getMedicamentos()
      .then(medicamentos => {
          this.medicamentos = medicamentos;
          console.log(medicamentos);
      });
    }

  // CARGAR MEDICAMENTO
    cargarMedicamento(
      idMedicamento: string,
      nombreMedicamento: string,
      dosisMedicamento: string,
      cadenaFrioMedicamento: boolean,
      laboratorioMedicamento:string,
      cantidadComprimidosMedicamento: string,
      f: NgForm) {
      this.modalAgregarMedicamento = false;
      
      this.cadena="No";
        //Inspeccion de billeteras
      console.log(idMedicamento, nombreMedicamento,cantidadComprimidosMedicamento);
      if(cadenaFrioMedicamento){
        this.cadena="Si";
      }

      

      this.medicamentoService.cargarMedicamento(idMedicamento, nombreMedicamento, dosisMedicamento, this.cadena,laboratorioMedicamento, cantidadComprimidosMedicamento)
      .then(medicamentoAgregado => {
        // Muestro un mensajito de Agregado con Éxito
        swal({
          title: 'Agregado!',
          text: 'Se ha creado el medicamento correctamente.',
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

        // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
        this.medicamentos.push(medicamentoAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
    }

  // EDITAR MEDICOS
    editarMedicamento(f: NgForm) {
      this.medicamentoService.editarMedicamento(this.selectedMedicamento._id,
                                      this.selectedMedicamento.nombre,
                                      this.selectedMedicamento.dosis,
                                      this.selectedMedicamento.cadenaFrio,
                                      this.selectedMedicamento.laboratorio,
                                      this.selectedMedicamento.cantidadComprimidos)
      .then(medicamentoEditado => {
        // Muestro un mensajito de Actualizado con Éxito
        swal({
          title: 'Actualizado!',
          text: 'Se ha actualizado el medicamento correctamente.',
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

        // PARA ACTUALIZAR VISTA (TABLA)
        this.medicamentos.forEach(elementoMedicamento => {
          if (elementoMedicamento._id === medicamentoEditado._id) {
            elementoMedicamento.nombre = medicamentoEditado.nombre;
            elementoMedicamento.dosis = medicamentoEditado.dosis;
            elementoMedicamento.cadenaFrio = medicamentoEditado.cadenaFrio;
            elementoMedicamento.laboratorio=medicamentoEditado.laboratorio;
            elementoMedicamento.cantidadComprimidos = medicamentoEditado.cantidadComprimidos;
          }
        });

        // Reseteo el selectedMedicamento y el formulario de editar
        this.selectedMedicamento = null;
        f.resetForm();
      });
    }

  // ELIMINAR MEDICAMENTO
    eliminarMedicamento() {
      // Mensajito: ¿ESTAS SEGURO?
      swal({
        title: 'Estas seguro?',
          text: 'Esta acción no se puede revertir!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
      })
      .then((willDelete) => {
        if (willDelete.value) {
          // SI ACEPTA
          this.medicamentoService.deleteMedicamento(this.selectedMedicamento._id)
          .then(medicamentoEliminado => {
            swal(
                'Eliminado!',
                'Medicamento eliminado correctamente',
                'success'
            );
            // Elimino el medico del arreglo de medicos (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) del medico eliminado
              this.medicamentos.forEach(function(medicamento, index) {
                  if (medicamento._id === medicamentoEliminado._id) {
                      i = index;
                  }
              });

              // "splice" corta el arreglo justo en el indice "i"
              this.medicamentos.splice(i, 1);

              // Reseteo el medico seleccionado a null
              this.selectedMedicamento = null;
          });
        } else {
          // Reseteo el medico seleccionado a null
          this.selectedMedicamento = null;
        }
      });

  }

  mostrarModalAgregarMedicamento() {
    this.modalAgregarMedicamento = true;
  }

  mostrarModalEditar() {
    if (this.selectedMedicamento != null) {
      this.modalEditarMedicamento = true;
    }

  }

  cerrarModalEditar() {
    this.modalEditarMedicamento = false;
  }
}

