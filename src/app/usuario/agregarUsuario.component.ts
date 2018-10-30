import {Component, Output, OnInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { default as swal } from 'sweetalert2';
import {UsuarioService} from './user.service';

@Component({
    selector: 'agregar-usuario',
    templateUrl: './agregarUsuario.component.html'
})


export class AgregarUsuarioComponent implements OnInit {
    userName: string;
    userFirstName: string;
    userLastName: string;
    password: string;


    @ViewChild('closeBtn') closeBtn: ElementRef;

    @Output() nuevoUsuario = new EventEmitter();

    constructor(
        private usuarioService: UsuarioService
    ) { }


    ngOnInit(): void {
    }

    autoCompletarUserName(): void {
        if (typeof this.userFirstName === 'undefined') {
            this.userFirstName = '';
        }
        if (typeof this.userLastName === 'undefined') {
            this.userLastName = '';
        }
        if (this.userFirstName.length > 0 && this.userLastName.length > 0) {
            this.userName = this.userFirstName.trim() + '.' + this.userLastName.trim();
        } else {
            this.userName = this.userFirstName + this.userLastName;
        }
    }

    addUsuario(): void {
        this.userName = this.userName.trim();
        this.userFirstName = this.userFirstName.trim();
        this.userLastName = this.userLastName.trim();


        this.usuarioService.createUsuario(this.userName, this.userFirstName, this.userLastName, this.password)
        .then(user => {
            this.closeBtn.nativeElement.click();
            swal({
              title: 'Agregado!',
              text: 'Se ha creado el usuario correctamente.',
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
            // Limpio los valores asi no quedan en el Modal
            this.userName = '';
            this.userFirstName = '';
            this.userLastName = '';
            this.password = '';
            this.nuevoUsuario.next(user);
        });

    }
}
