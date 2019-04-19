import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { HistorialPedidos } from './historial-pedidos';
import { HistorialPedidosService } from './historial-pedidos.service';
import { Pedido } from '../pedido/pedido';
import { PedidoService } from '../pedido/pedido.service';
import {Paciente }from '../paciente/paciente'
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.scss'],
  animations: [routerTransition()]
})
export class HistorialPedidosComponent implements OnInit {
  model: any = {};
  historialPedidos: HistorialPedidos[] = [];
  colPedidos: any[];
  colHistorial: any[];
  pedidos: Pedido[] = [];
  pacientes: Paciente[] = [];
  selectedPedido: Pedido;
  selectedHistorial: HistorialPedidos;
  modalEliminarPaciente = false;
  historial:HistorialPedidos;
  hoy: String;
  medicaNom:string;
  apellidoRepa:string;


  
  constructor(
    private HistorialPedidosService: HistorialPedidosService,
    private PedidoService: PedidoService) { 
  }

  ngOnInit() {
    this.getPedidos();

    this.hoy=new Date(Date.now()).toLocaleString().slice(0,15);

    this.colPedidos= [
        { field: 'numero', header: 'Numero Pedido' },
        { field: 'estado', header: 'Estado' },       
        { field: 'horaString', header: 'Última modificacion' },
        { field: 'pacApe', header: 'Apellido Cliente'},
        { field: 'pacDir', header: 'Dirección' },
        { field: 'repaApe', header: 'Apellido Repartidor'},
        { field: 'medicaNom', header: 'Medicamento'},
    ];

    this.colHistorial= [
        { field: 'numero', header: 'Numero Pedido' },
        { field: 'estado', header: 'Estado' },       
        { field: 'horaCambioString', header: 'Modificación' },
        { field: 'pacApe', header: 'Apellido Cliente'},
        { field: 'pacDire', header: 'Dirección' },
        { field: 'repaApe', header: 'Apellido Repartidor'},
        { field: 'medicaNom', header: 'Medicamento'},
    ];
  }

   // GET pedidos, para que seleccione uno
   getPedidos() {

    this.PedidoService.getPedidos()
    .then(pedidos => {
        this.pedidos = pedidos;
        pedidos.forEach(pedido => {
          pedido.horaString = pedido.hora.toLocaleString().slice(0,10);
          pedido.pacApe=pedido.pac.apellido;
          pedido.pacDir=pedido.pac.direccion;
          pedido.medicaNom=pedido.medica.nombre;
          if(pedido.repartidor!=null)
          {
            pedido.repaApe=pedido.repartidor.apellido;
          }
          else
          {
            pedido.repaApe='Repartidor no asignado';
          }
        })
      
    });
  }

  //get del seleccionado
  getHistorialPedido(event: any) {
    console.log("este es el pedido "+this.selectedPedido.medicaNom);
    this.medicaNom =this.selectedPedido.medicaNom;
    
    

    this.HistorialPedidosService.getHistorialPedidos(this.selectedPedido._id)
      .then(historialPedidos => {

    

          this.historialPedidos = historialPedidos;
          historialPedidos.forEach(historial =>{
          console.log(historial);
          historial.horaCambioString = historial.hora.toLocaleString().slice(0,10) + " "+ historial.hora.toLocaleString().slice(11,16) ;
          historial.pacApe=historial.pac.apellido;
          historial.pacDire=historial.pac.direccion;
          historial.medicaNom=this.medicaNom;
   /*         if(this.historial.repaApe!=null)
          {
            historial.repaApe=this.historial.repartidor.apellido;
          }
          else
          {
            historial.repaApe='Repartidor no asignado';
          } 
 */
      })

  });

    // Reseteo el selectedPaciente y el formulario de editar
    this.selectedPedido = null;
  }
}


