import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { NgForm } from '@angular/forms';
import { Farmacia } from "./farmacia";
import { FarmaciaService } from "./farmacia.service";
import swal from 'sweetalert2';

@Component({
    selector: 'app-farmacia',
    templateUrl: './farmacia.component.html',
    styleUrls: ['./farmacia.component.css'],
    animations: [routerTransition()]
})
export class FarmaciaComponent implements OnInit {
  model: any = {};
  farmacias: Farmacia[] = [];
  cols: any[];
  selectedFarmacia: Farmacia;
  modalAgregarFarmacia = false;
  modalEditarFarmacia = false;
  modalEliminarFarmacia = false;
  


  constructor(
    private farmaciaService: FarmaciaService
  ) {}


  ngOnInit() {
      this.getFarmacias();

      this.cols = [
        { field: 'cuit', header: 'Cuit' },       
        { field: 'nombre', header: 'Nombre' },       
        { field: 'telefono', header: 'Telefono' },
        { field: 'direccion', header: 'Direccion' },        
        { field: 'email', header: 'Email' }
      ];
  }

  // GET Farmacias
    getFarmacias() {
      this.farmaciaService.getFarmacias()
      .then(farmacias => {
          this.farmacias = farmacias;
          console.log(farmacias);
        
      });
    }

  // CARGAR Farmacia
    cargarFarmacia(
    cuitFarmacia: string,
      nombreFarmacia: string,
      telefonoFarmacia: string,
      direccionFarmacia:string,
      emailFarmacia: string,
      f: NgForm) {
      this.modalAgregarFarmacia = false;
      this.farmaciaService.cargarFarmacia(cuitFarmacia, nombreFarmacia,telefonoFarmacia,direccionFarmacia, emailFarmacia)
      .then(farmaciaAgregado => {
        // Muestro un mensajito de Agregado con Éxito
        swal({
          title: 'Agregado!',
          text: 'Se ha creado el farmacia correctamente.',
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
        this.farmacias.push(farmaciaAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
    }

  // EDITAR Farmacia
    editarFarmacia(f: NgForm) {
      this.farmaciaService.editarFarmacia(this.selectedFarmacia._id,
                                      this.selectedFarmacia.nombre,
                                      this.selectedFarmacia.telefono,
                                      this.selectedFarmacia.direccion,
                                      this.selectedFarmacia.email)
      .then(farmaciaEditado => {
        // Muestro un mensajito de Actualizado con Éxito
        swal({
          title: 'Actualizado!',
          text: 'Se ha actualizado la farmacia correctamente.',
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
        this.farmacias.forEach(elementoFarmacia => {
          if (elementoFarmacia.cuit === elementoFarmacia.cuit) {
            elementoFarmacia.nombre = elementoFarmacia.nombre;
            elementoFarmacia.telefono = elementoFarmacia.telefono;
            elementoFarmacia.direccion=elementoFarmacia.direccion;
            elementoFarmacia.email= elementoFarmacia.email;
        
          }
        });

        // Reseteo el selectedFarmacia y el formulario de editar
        this.selectedFarmacia = null;
        f.resetForm();
      });
    }

  // ELIMINAR FARMACIA
  eliminarFarmacia() {
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
        this.farmaciaService.deleteFarmacia(this.selectedFarmacia._id)
        .then(farmaciaEliminado => {
          swal(
              'Eliminado!',
              'Farmacia eliminado correctamente',
              'success'
          );
          // Elimino el medico del arreglo de medicos (actualiza la tabla)
            let i;

            // Con el forEach busco la posicion (index) del medico eliminado
            this.farmacias.forEach(function(farmacia, index) {
                if (farmacia._id === farmaciaEliminado._id) {
                    i = index;
                }
            });

            // "splice" corta el arreglo justo en el indice "i"
            this.farmacias.splice(i, 1);

            // Reseteo el medico seleccionado a null
            this.selectedFarmacia = null;
        });
      } else {
        // Reseteo el medico seleccionado a null
        this.selectedFarmacia = null;
      }
    });

}

  mostrarModalAgregarFarmacia() {
    this.modalAgregarFarmacia = true;
  }

  mostrarModalEditar() {
    if (this.selectedFarmacia != null) {
      this.modalEditarFarmacia = true;
    }

  }

  cerrarModalEditar() {
    this.modalEditarFarmacia = false;
  }
}

