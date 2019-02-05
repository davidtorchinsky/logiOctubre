import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Medico } from './medico';
import { MedicoService } from './medico.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    templateUrl: './medico.component.html',
    styleUrls: ['./medico.component.css'],
    animations: [routerTransition()]
})
export class MedicoComponent implements OnInit {
  model: any = {};
  medicos: Medico[] = [];
  cols: any[];
  selectedMedico: Medico;
  modalAgregarMedico = false;
  modalEditarMedico = false;
  modalEliminarMedico = false;


  constructor(
    private medicoService: MedicoService
  ) {}


  ngOnInit() {
      this.getMedicos();

      this.cols = [
        { field: 'dni', header: 'DNI' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'matricula', header: 'Matricula' }
      ];
  }

  // GET MEDICOS
    getMedicos() {
      this.medicoService.getMedicos()
      .then(medicos => {
          this.medicos = medicos;
          console.log(medicos);
      });
    }

  // CARGAR MEDICO
    cargarMedico(
      dniMedico: string,
      nombreMedico: string,
      apellidoMedico: string,
      telefonoMedico: string,
      matriculaMedico: string,
      f: NgForm) {
      this.modalAgregarMedico = false;
      this.medicoService.cargarMedico(dniMedico, nombreMedico, apellidoMedico, telefonoMedico, matriculaMedico)
      .then(medicoAgregado => {
        // Muestro un mensajito de Agregado con Éxito
        swal({
          title: 'Agregado!',
          text: 'Se ha creado el médico correctamente.',
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
        this.medicos.push(medicoAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
    }

  // EDITAR MEDICOS
    editarMedico(f: NgForm) {
      this.medicoService.editarMedico(this.selectedMedico._id,
                                      this.selectedMedico.nombre,
                                      this.selectedMedico.apellido,
                                      this.selectedMedico.telefono,
                                      this.selectedMedico.matricula)
      .then(medicoEditado => {
        // Muestro un mensajito de Actualizado con Éxito
        swal({
          title: 'Actualizado!',
          text: 'Se ha actualizado el médico correctamente.',
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
        this.medicos.forEach(elementoMedico => {
          if (elementoMedico._id === medicoEditado._id) {
            elementoMedico.nombre = medicoEditado.nombre;
            elementoMedico.apellido = medicoEditado.apellido;
            elementoMedico.telefono = medicoEditado.telefono;
            elementoMedico.matricula = medicoEditado.matricula;
          }
        });

        // Reseteo el selectedMedico y el formulario de editar
        this.selectedMedico = null;
        f.resetForm();
      });
    }

  // ELIMINAR MEDICO
    eliminarMedico() {
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
          this.medicoService.deleteMedico(this.selectedMedico._id)
          .then(medicoEliminado => {
            swal(
                'Eliminado!',
                'Medico eliminado correctamente',
                'success'
            );
            // Elimino el medico del arreglo de medicos (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) del medico eliminado
              this.medicos.forEach(function(medico, index) {
                  if (medico._id === medicoEliminado._id) {
                      i = index;
                  }
              });

              // "splice" corta el arreglo justo en el indice "i"
              this.medicos.splice(i, 1);

              // Reseteo el medico seleccionado a null
              this.selectedMedico = null;
          });
        } else {
          // Reseteo el medico seleccionado a null
          this.selectedMedico = null;
        }
      });

  }

  mostrarModalAgregarMedico() {
    this.modalAgregarMedico = true;
  }

  mostrarModalEditar() {
    if (this.selectedMedico != null) {
      this.modalEditarMedico = true;
    }

  }
  cerrarModalEditar(){
    
    this.modalEditarMedico=false;
    
  }

  cerrarModalEliminar(){
    this.modalEliminarMedico = false;
  }

  cerrarModalAgregar(){
    this.modalAgregarMedico = false;
  }

  cerrarModalEditar() {
    this.modalEditarMedico = false;
  }
}

