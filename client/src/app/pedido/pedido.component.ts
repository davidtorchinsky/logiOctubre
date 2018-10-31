import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    templateUrl: './pedido.component.html',
    styleUrls: ['./pedido.component.scss'],
    animations: [routerTransition()]
})
export class PedidoComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit() {
  }

}
