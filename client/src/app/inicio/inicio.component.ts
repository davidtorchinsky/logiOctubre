import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Pedido } from '../pedido/pedido';
import { PedidoService } from '../pedido/pedido.service'
import { PedidoComponent } from '../pedido/pedido.component'


@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss'],
    animations: [routerTransition()]
})
export class InicioComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    pedidos: Pedido[] = [];
    cols: any[];
    selectedPedido: Pedido;
    ped: PedidoComponent

   

    constructor() {

        
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {

        //this.ped.getPedidos();

        this.cols = [
            { field: 'numero', header: 'Numero Pedido' },
            { field: 'estado', header: 'Estado' },       
            { field: 'horaString', header: 'Última modificacion' },
           
            { field: 'pacApe', header: 'Apellido Cliente'},
            { field: 'pacDir', header: 'Dirección' },
            { field: 'repaApe', header: 'Apellido Repartidor'},
            { field: 'medicaNom', header: 'Medicamento'},
            { field: 'cadenaFrio', header: 'Cadena Frio' }  
          ];
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
