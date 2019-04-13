import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Pedido } from './pedido';
import { PedidoService } from './pedido.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Paciente } from '../paciente/paciente';
import { PacienteService } from '../paciente/paciente.service';
import { Medicamento } from '../medicamento/medicamento';
import { MedicamentoService } from '../medicamento/medicamento.service';
import {DropdownModule} from 'primeng/dropdown';
import {SelectItem} from 'primeng/api';
//import {Dropdown} from 'primeng/api';


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
  hoy: String;
  fecha:String;
  modalAgregarPedido = false;
  modalEditarPedido = false;
  modalEliminarPedido = false;
  cadena:string = "";
  ultimoNumero:number;
  estadoGenerado="Generado";

  estados:any[];
  selectedEstado: String;

  
  //Pacientes
  pacientes: Paciente[] = [];
  colsPacientes: any[];
  selectedPaciente: Paciente;

  //Medicamentos
  medicamentos: Medicamento[] = [];
  colsMedicamentos: any[];
  selectedMedicamento: Medicamento;


  constructor(
    private pedidoService: PedidoService,
    private pacienteService:PacienteService,
    private medicamentoService: MedicamentoService
  ) {

    this.estados = [
      {name: 'En Proceso', code: 'EP'},
      {name: 'Retirado', code: 'RET'},
      {name: 'Pendiente', code: 'PEN'},
      {name: 'Entregado', code: 'EN'}
  ];
  


  }


  ngOnInit() {

    
    this.hoy=new Date(Date.now()).toLocaleString().slice(0,15);

    console.log(this.hoy);
      this.getPedidos();

      this.cols = [
        { field: 'numero', header: 'Numero Pedido' },
        { field: 'estado', header: 'Estado' },       
        { field: 'horaString', header: 'Última modificacion' },
<<<<<<< HEAD
        { field: 'apellido', header: 'Apellido Cliente'},
=======
       
        { field: 'pac', header: 'Apellido Cliente'},
>>>>>>> ricoGABO
        { field: 'direccion', header: 'Dirección' },
        { field: 'repartidor', header: 'Apellido Repartidor'},
        { field: 'medica', header: 'Medicamento'},
        { field: 'cadenaFrio', header: 'Cadena Frio' }  
      ];

      this.getPacientes();
     
      this.colsPacientes = [
        { field: 'dni', header: 'DNI' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' },        
    
        
      ];

      this.getMedicamentos();
      this.colsMedicamentos = [
        { field: 'idMedicamento', header: 'Id Medicamento' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'dosis', header: 'Dosis' },
        { field: 'laboratorio', header: 'Laboratorio' }
      ];
  }

  // GET PEDIDOS
    getPedidos() {
      this.pedidoService.getPedidos()
      .then(pedidos => {
          this.pedidos = pedidos;
<<<<<<< HEAD
          
=======
          console.log("Lo que tengo guardado en la ultima posicion es: "+this.pedidos[16]);
>>>>>>> ricoGABO
          this.pedidos.forEach(elementoPedido => {  
              elementoPedido.horaString = elementoPedido.hora.toLocaleString().slice(0,10)+" " + elementoPedido.hora.toLocaleString().slice(12,16);
              
            }

          )
          this.ultimoNumero = pedidos.length+1;

          
      });
    }

    getPacientes() {
      this.pacienteService.getPacientes()
      .then(pacientes => {
          this.pacientes = pacientes;          
      });
    }

    
    getMedicamentos() {
      
      this.medicamentoService.getMedicamentos()
      .then(medicamentos => {
          this.medicamentos = medicamentos;          
      });
    }

  // CARGAR PEDIDO
    cargarPedido(
      numeroPedido: Number,
      estadoPedido: String,
      horaYFechaPedido: Date,
      idPacientePedido: String,
      idMedicamentoPedido: String,
      cadenaFrioPedido: String,
            
      f: NgForm) {
      this.modalAgregarPedido = false;

      console.log(numeroPedido);
      console.log(estadoPedido);
      console.log(horaYFechaPedido);
      console.log(idPacientePedido);
      console.log(idMedicamentoPedido);
      
      this.cadena="No";
        //Inspeccion de billeteras      
      if(cadenaFrioPedido){
        this.cadena="Si";
      }

     

      this.pedidoService.cargarPedido(numeroPedido, estadoPedido, new Date(Date.now()), this.cadena, idPacientePedido, idMedicamentoPedido)
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

  // EDITAR Pedido
    editarPedido(f: NgForm) {
      console.log(this.selectedEstado);
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
            elementoPedido.horaString = pedidoEditado.hora.toLocaleTimeString();
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

  
  cerrarModalAgregarPedido() {
    this.modalAgregarPedido = false;
  }






/// para el menu desplegable

  /*counter = 0;
  @ViewChild('dd') dropdown: Dropdown;


  OnChange(ev) {
    //console.log("OnChange", ev);
    //console.log("OnChange", this.dropdown.panelVisible);

    if (this.dropdown.panelVisible && this.counter == 0) {
      this.counter = 1;
      setTimeout(() => {
        this.CheckClosePanel();
      }, 100);
    }
  }

  OnFocus() {
    console.log("OnFocus");
  }
  OnBlur() {
    console.log("OnBlur");
  }
  
  CheckClosePanel() {
    //console.log("CheckClosePanel");
    if (this.dropdown.panelVisible) {
      ++this.counter;
      setTimeout(() => {
        this.CheckClosePanel();
      }, 100);
    }
    else {
      console.log("CheckClosePanel - counter:", this.counter, " select:", this.selectedPaciente);
      this.counter = 0;
    }
  }

  MyItemClick(event) {
    console.log("MyItemClick", event);
    console.log(event.target.innerText);
    if (event.target.classList.contains('disabled')) {
      event.stopPropagation();
    }
  }

  MyKeydown(event) {
    console.log("MyKeydown", this.dropdown.selectedOption.disabled);
    if (this.dropdown.selectedOption.disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  MyKeydownEnter(event) {
    console.log("MyKeydownEnter", this.dropdown.selectedOption.disabled);
    if (this.dropdown.selectedOption.disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  OnClickDisabled() {
    console.log("OnClickDisabled");
    event.stopPropagation();
  }*/
}




