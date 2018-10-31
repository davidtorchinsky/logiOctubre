import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import swal from 'sweetalert2';

import { Medico } from './medico';
import { MedicoService } from './medico.service';

@Component({
    selector: 'app-productos',
    templateUrl: './medico.component.html',
    styleUrls: ['./medico.component.css'],
    animations: [routerTransition()]
})
export class MedicoComponent implements OnInit {

  medicos: Medico[];
  cols: any[];
  selectedMedico;

  constructor(
    private medicoService: MedicoService
  ) {
      this.medicos = [
        {_id: '01', nombre: 'John', apellido: 'Doe'},
        {_id: '02', nombre: 'Anna', apellido: 'Smith'},
        {_id: '03', nombre: 'Peter', apellido: 'Jones'}
      ];

      this.cols = [
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'Apellido' }
      ];
  }


  ngOnInit() {
  }

  getMedicos() {
    this.medicoService.getMedicos()
    .then(medicos => {
        this.medicos = medicos;
    });
  }

}
