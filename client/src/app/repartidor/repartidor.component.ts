import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    templateUrl: './repartidor.component.html',
    styleUrls: ['./repartidor.component.scss'],
    animations: [routerTransition()]
})
export class RepartidorComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit() {
  }

}
