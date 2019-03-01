import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { NgForm } from '@angular/forms';
import { Clinica } from "./clinica";
import { ClinicaService } from "./clinica.service";
import swal from 'sweetalert2';

@Component({
    selector: 'app-clinica',
    templateUrl: './clinica.component.html',
    styleUrls: ['./clinica.component.css'],
    animations: [routerTransition()]
})
export class ClinicaComponent implements OnInit {
  model: any = {};
  clinicas: Clinica[] = [];
  cols: any[];
  selectedClinica: Clinica;
  modalAgregarClinica = false;
  modalEditarClinica = false;
  modalEliminarClinica = false;
  


  constructor(
    private clinicaService: ClinicaService
  ) {}


  ngOnInit() {
      this.getClinicas();

      this.cols = [
        { field: 'idClinica', header: 'Id' },       
        { field: 'nombre', header: 'Nombre' },       
        { field: 'telefono', header: 'Telefono' },
        { field: 'direccion', header: 'Direccion' },        
        { field: 'email', header: 'Email' },
      ];
  }

  // GET Clinicas
    getClinicas() {
      this.clinicaService.getClinicas()
      .then(clinicas => {
          this.clinicas = clinicas;
        
      });
    }

  // CARGAR Clinica
    cargarClinica(
   idClinica: string,
      nombreClinica: string,
      telefonoClinica: string,
      direccionClinica:string,
      emailClinica: string,
      f: NgForm) {
      this.modalAgregarClinica = false;
      this.clinicaService.cargarClinica(idClinica, nombreClinica,telefonoClinica,direccionClinica, emailClinica)
      .then(clinicaAgregado => {
        // Muestro un mensajito de Agregado con Éxito
        swal({
          title: 'Agregado!',
          text: 'Se ha creado la clinica correctamente.',
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
        this.clinicas.push(clinicaAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
    }

  // EDITAR Clinica
    editarPaciente(f: NgForm) {
      this.clinicaService.editarClinica(this.selectedClinica._id,
                                      this.selectedClinica.nombre,
                                      this.selectedClinica.telefono,
                                      this.selectedClinica.direccion,
                                      this.selectedClinica.email)
      .then(clinicaEditado => {
        // Muestro un mensajito de Actualizado con Éxito
        swal({
          title: 'Actualizado!',
          text: 'Se ha actualizado el paciente correctamente.',
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
        this.clinicas.forEach(elementoClinica => {
          if (elementoClinica.idClinica === elementoClinica.idClinica) {
            elementoClinica.nombre = elementoClinica.nombre;
            elementoClinica.telefono = elementoClinica.telefono;
            elementoClinica.direccion=elementoClinica.direccion;
            elementoClinica.email= elementoClinica.email;
        
          }
        });

        // Reseteo el selectedPaciente y el formulario de editar
        this.selectedClinica = null;
        f.resetForm();
      });
    }

  // ELIMINAR MEDICAMENTO
    eliminarClinica() {
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
          this.clinicaService.deleteClinica(this.selectedClinica.idClinica)
          .then(clinicaEliminado => {
            swal(
                'Eliminado!',
                'Clinica eliminada correctamente',
                'success'
            );
            // Elimino el medico del arreglo de medicos (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) del medico eliminado
              this.clinicas.forEach(function(clinica, index) {
                  if (clinica.idClinica === clinicaEliminado.idClinica) {
                      i = index;
                  }
              });

              // "splice" corta el arreglo justo en el indice "i"
              this.clinicas.splice(i, 1);

              // Reseteo el medico seleccionado a null
              this.selectedClinica = null;
          });
        } else {
          // Reseteo el medico seleccionado a null
          this.selectedClinica = null;
        }
      });

  }

  mostrarModalAgregarClinica() {
    this.modalAgregarClinica = true;
  }

  mostrarModalEditar() {
    if (this.selectedClinica != null) {
      this.modalEditarClinica = true;
    }

  }

  cerrarModalEditar() {
    this.modalEditarClinica = false;
  }
}

