import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Repartidor } from './repartidor';
import { RepartidorService } from './repartidor.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    templateUrl: './repartidor.component.html',
    styleUrls: ['./repartidor.component.css'],
    animations: [routerTransition()]
})
export class RepartidorComponent implements OnInit {
  model: any = {};
  repartidores: Repartidor[] = [];
  cols: any[];
  selectedRepartidor: Repartidor;
  modalAgregarRepartidor = false;
  modalEditarRepartidor = false;
  modalEliminarRepartidor = false;


  constructor(
    private repartidorService: RepartidorService
  ) {}


  ngOnInit() {
      this.getRepartidores();

      this.cols = [
        { field: 'dni', header: 'DNI' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },
        { field: 'telefono', header: 'Telefono' },
        { field: 'legajo', header: 'Legajo' }
      ];
  }

  // GET REPARTIDORES
    getRepartidores() {
      this.repartidorService.getRepartidores()
      .then(repartidores => {
          this.repartidores = repartidores;
          console.log(repartidores);
      });
    }

  // CARGAR REPARTIDOR
    cargarRepartidor(
      dniRepartidor: string,
      nombreRepartidor: string,
      apellidoRepartidor: string,
      telefonoRepartidor: string,
      legajoRepartidor: string,
      f: NgForm) {
      this.modalAgregarRepartidor = false;
      this.repartidorService.cargarRepartidor(dniRepartidor, nombreRepartidor, apellidoRepartidor, telefonoRepartidor, legajoRepartidor)
      .then(repartidorAgregado => {
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
        this.repartidores.push(repartidorAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
    }

  // EDITAR REPARTIDORES
    editarRepartidor(f: NgForm) {
      this.repartidorService.editarRepartidor(this.selectedRepartidor._id,
                                      this.selectedRepartidor.nombre,
                                      this.selectedRepartidor.apellido,
                                      this.selectedRepartidor.telefono,
                                      this.selectedRepartidor.legajo)
      .then(repartidorEditado => {
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
        this.repartidores.forEach(elementoRepartidor => {
          if (elementoRepartidor._id === repartidorEditado._id) {
            elementoRepartidor.nombre = repartidorEditado.nombre;
            elementoRepartidor.apellido = repartidorEditado.apellido;
            elementoRepartidor.telefono = repartidorEditado.telefono;
            elementoRepartidor.legajo = repartidorEditado.legajo;
          }
        });

        // Reseteo el selectedRepartidor y el formulario de editar
        this.selectedRepartidor = null;
        f.resetForm();
      });
    }

  // ELIMINAR REPARTIDOR
    eliminarRepartidor() {
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
          this.repartidorService.deleteRepartidor(this.selectedRepartidor._id)
          .then(repartidorEliminado => {
            swal(
                'Eliminado!',
                'Repartidor eliminado correctamente',
                'success'
            );
            // Elimino el repartidor del arreglo de repartidores (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) del repartidor eliminado
              this.repartidores.forEach(function(repartidor, index) {
                  if (repartidor._id === repartidorEliminado._id) {
                      i = index;
                  }
              });

              // "splice" corta el arreglo justo en el indice "i"
              this.repartidores.splice(i, 1);

              // Reseteo el repartidor seleccionado a null
              this.selectedRepartidor = null;
          });
        } else {
          // Reseteo el repartidor seleccionado a null
          this.selectedRepartidor = null;
        }
      });

  }

  mostrarModalAgregarRepartidor() {
    this.modalAgregarRepartidor = true;
  }

  mostrarModalEditar() {
    if (this.selectedRepartidor != null) {
      this.modalEditarRepartidor = true;
    }

  }


  cerrarModalEliminar(){
    this.modalEliminarRepartidor = false;
  }

  cerrarModalAgregar(){
    this.modalAgregarRepartidor = false;
  }

}

