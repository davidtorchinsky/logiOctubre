import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { ObraSocial } from './obraSocial';
import { ObraService } from './obraSocial.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    templateUrl: './obraSocial.component.html',
    styleUrls: ['./obraSocial.component.css'],
    animations: [routerTransition()]
})
export class ObraSocialComponent implements OnInit {
  model: any = {};
  obra: ObraSocial[] = [];
  cols: any[];
  selectedObra: ObraSocial;
  modalAgregarObra = false;
  modalEditarObra = false;
  modalEliminarObra = false;


  constructor(
    private obraSocialService: ObraService
  ) {}


  ngOnInit() {
      this.getObraSocial();

      this.cols = [
        { field: 'cuit', header: 'Cuit' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'direccion', header: 'Direccion' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'email', header: 'Email' }
      ];
  }

  // GET OBRAS
    getObraSocial() {
      this.obraSocialService.getObraSocial()
      .then(obras => {
          this.obra = obras;
          console.log(obras);
      });
    }

  // CARGAR OBRA
    cargarObraSocial(
      cuitObraSocial: string,
      nombreObra: string,
      direccionObra: string,
      telefonoObra: string,
      emailObra: string,
      f: NgForm) {
      this.modalAgregarObra = false;
      this.obraSocialService.cargarObra(cuitObraSocial, nombreObra, direccionObra, telefonoObra, emailObra)
      .then(obraAgregada => {
        // Muestro un mensajito de Agregado con Éxito
        swal({
          title: 'Agregado!',
          text: 'Se ha creado la obra social correctamente.',
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
        this.obra.push(obraAgregada);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
    }

  // EDITAR OBRAS
    editarObra(f: NgForm) {
      this.obraSocialService.editarObra(this.selectedObra._id,
                                      this.selectedObra.nombre,
                                      this.selectedObra.direccion,
                                      this.selectedObra.telefono,
                                      this.selectedObra.email)
      .then(ObraEditado => {
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
        this.obra.forEach(elementoObra => {
          if (elementoObra._id === ObraEditado._id) {
            elementoObra.nombre = ObraEditado.nombre;
            elementoObra.direccion = ObraEditado.direccion;
            elementoObra.telefono = ObraEditado.telefono;
            elementoObra.email = ObraEditado.email;
          }
        });

        // Reseteo el selectedObras y el formulario de editar
        this.selectedObra = null;
        f.resetForm();
      });
    }

  // ELIMINAR OBRA
    eliminarObra() {
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
          this.obraSocialService.deleteObra(this.selectedObra._id)
          .then(obraEliminada => {
            swal(
                'Eliminado!',
                'Obra social eliminada correctamente',
                'success'
            );
            // Elimino la obra del arreglo de obras (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) de la obra eliminado
              this.obra.forEach(function(obra, index) {
                  if (obra._id === obraEliminada._id) {
                      i = index;
                  }
              });

              // "splice" corta el arreglo justo en el indice "i"
              this.obra.splice(i, 1);

              // Reseteo la obra seleccionado a null
              this.selectedObra = null;
          });
        } else {
          // Reseteo la obra seleccionado a null
          this.selectedObra = null;
        }
      });

  }

  mostrarModalAgregarObra() {
    this.modalAgregarObra = true;
  }

  mostrarModalEditar() {
    if (this.selectedObra != null) {
      this.modalEditarObra = true;
    }

  }

  cerrarModalEditar() {
    this.modalEditarObra = false;
  }
}

