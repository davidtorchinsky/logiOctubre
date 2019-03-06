import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Pedido } from '../pedido/pedido';
import { PedidoService } from '../pedido/pedido.service';
import { RepartidorService } from '../repartidor/repartidor.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Repartidor } from '../repartidor/repartidor';
import { AsignarRepartidorService } from './asignar_repartidor.service';


@Component({
    selector: 'app-asignar-repartidor',
    templateUrl: './asignar_repartidor.component.html',
    styleUrls: ['./asignar_repartidor.component.css'],
    animations: [routerTransition()]
})
export class AsignarRepartidorComponent implements OnInit {

    model: any = {};
    pedidos: Pedido[] = [];
    colsPedidos: any[];
    selectedPedido: Pedido;

    repartidores: Repartidor[] = [];
    colsRepartidores: any[];
    selectedRepartidor: Repartidor;

    modalAsignarRepartidor = false;

  constructor(
    private pedidoService: PedidoService,
    private repartidorService: RepartidorService,
    private asignarRepartidorService: AsignarRepartidorService
  ) {}


  ngOnInit() {
      this.getPedidos();

      this.colsPedidos = [
        { field: 'numero', header: 'Numero' },
        { field: 'estado', header: 'Nombre' },
        { field: 'hora', header: 'Apellido' },
        { field: 'cadenaFrio', header: 'Telefono' }
        
      ];

      this.colsRepartidores = [
        { field: 'dni', header: 'DNI' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Dosis' },
        { field: 'telefono', header: 'Cadena Frio' },
        { field: 'legajo', header: 'Laboratorio' }
        
      ];
  }

  getPedidos() {
    this.pedidoService.getPedidos()
    .then(pedidos => {
        this.pedidos = pedidos;
        console.log(pedidos);
    });
  }

  getRepartidores(event: any) {
    this.repartidorService.getRepartidores()
      .then(repartidores => {
          this.repartidores = repartidores;
          console.log(repartidores);
      });
  }


  cargarRepartidor() {
    this.asignarRepartidorService.cargarRepartidor(this.selectedPedido._id,this.selectedRepartidor._id);
  }

  
  mostrarModalAsignarRepartidor() {
    this.modalAsignarRepartidor = true;
  }

  cerrarModalAsignarRepartidor() {
    this.modalAsignarRepartidor = false;
  }
}

