import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Pedido } from './pedido';
import { PedidoService } from './pedido.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    templateUrl: './pedido.component.html',
    styleUrls: ['./pedido.component.css'],
    animations: [routerTransition()]
})
export class PedidoComponent implements OnInit {
  model: any = {};
  pedidos: Pedido[] = [];
  cols: any[];
  selectedPedido: Pedido;
  modalAgregarPedido = false;
  modalEditarPedido = false;
  modalEliminarPedido = false;
  cadena:string = "";


  constructor(
    private pedidoService: PedidoService
  ) {}


  ngOnInit() {
      this.getPedidos();

      this.cols = [
        { field: 'numero', header: 'Numero Pedido' },
        { field: 'estado', header: 'Estado' },       
        { field: 'hora', header: 'Hora y Fecha de la ultima modificacion' },
        { field: 'cadenaFrio', header: 'Cadena Frio' }
        
      ];
  }

  // GET PEDIDOS
    getPedidos() {
      this.pedidoService.getPedidos()
      .then(pedidos => {
          this.pedidos = pedidos;
          console.log(pedidos);
      });
    }

  // CARGAR PEDIDO
    cargarPedido(
      numeroPedido: String,
      estadoPedido: String,
      horaYFechaPedido: Date,
      cadenaFrioPedido: String,      
      f: NgForm) {
      this.modalAgregarPedido = false;
      
      this.cadena="No";
        //Inspeccion de billeteras      
      if(cadenaFrioPedido){
        this.cadena="Si";
      }

      

      this.pedidoService.cargarPedido(numeroPedido, estadoPedido, horaYFechaPedido, this.cadena)
      .then(pedidoAgregado => {
        // Muestro un mensajito de Agregado con Éxito
        swal({
          title: 'Agregado!',
          text: 'Se ha creado el pedido correctamente.',
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

        // Agrego el Pedido al Arreglo de Pedidos (actualiza la tabla)
        this.pedidos.push(pedidoAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
    }

  // EDITAR MEDICOS
    editarPedido(f: NgForm) {
      this.pedidoService.editarPedido(this.selectedPedido._id,
                                      this.selectedPedido.estado,
                                      this.selectedPedido.hora,
                                      this.selectedPedido.cadenaFrio)
      .then(pedidoEditado => {
        // Muestro un mensajito de Actualizado con Éxito
        swal({
          title: 'Actualizado!',
          text: 'Se ha actualizado el pedido correctamente.',
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
        this.pedidos.forEach(elementoPedido => {
          if (elementoPedido._id === pedidoEditado._id) {
            elementoPedido.estado = pedidoEditado.estado;
            elementoPedido.hora = pedidoEditado.hora;
            elementoPedido.cadenaFrio = pedidoEditado.cadenaFrio;
            
          }
        });

        // Reseteo el selectedPedido y el formulario de editar
        this.selectedPedido = null;
        f.resetForm();
      });
    }

  // ELIMINAR PEDIDO
    eliminarPedido() {
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
          this.pedidoService.deletePedido(this.selectedPedido._id)
          .then(pedidoEliminado => {
            swal(
                'Eliminado!',
                'Pedido eliminado correctamente',
                'success'
            );
            // Elimino el medico del arreglo de medicos (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) del medico eliminado
              this.pedidos.forEach(function(pedido, index) {
                  if (pedido._id === pedidoEliminado._id) {
                      i = index;
                  }
              });

              // "splice" corta el arreglo justo en el indice "i"
              this.pedidos.splice(i, 1);

              // Reseteo el medico seleccionado a null
              this.selectedPedido = null;
          });
        } else {
          // Reseteo el medico seleccionado a null
          this.selectedPedido = null;
        }
      });

  }

  mostrarModalAgregarPedido() {
    this.modalAgregarPedido = true;
  }

  mostrarModalEditar() {
    if (this.selectedPedido != null) {
      this.modalEditarPedido = true;
    }

  }

  cerrarModalEditar() {
    this.modalEditarPedido = false;
  }
}

