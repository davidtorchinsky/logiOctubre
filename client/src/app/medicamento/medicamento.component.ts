import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    templateUrl: './medicamento.component.html',
    styleUrls: ['./medicamento.component.scss'],
    animations: [routerTransition()]
})
export class MedicamentoComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit() {
  }

}
