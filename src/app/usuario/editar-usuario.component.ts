import {Component, Output, OnInit, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';

// Esquemas
import {Usuario} from './usuario';

// Servicios
import { UsuarioService } from './user.service';
import {SecurityUtils} from '../SecurityUtils';

@Component({
  selector: 'editar-usuario',
  templateUrl: './editar-usuario.component.html'
})

export class EditarUsuarioComponent implements OnInit {

    @Input() selectedUsuario: Usuario;

    @Output() usuarioEditado = new EventEmitter();

    @ViewChild('botonCerrar') botonCerrar: ElementRef;

    constructor(
        private usuarioService: UsuarioService
         ) {

    }


    ngOnInit(): void {

    }

    editUsuario(): void {
        this.usuarioService.updateUsuario(this.selectedUsuario._id, this.selectedUsuario.username,
            this.selectedUsuario.firstName, this.selectedUsuario.lastName, this.selectedUsuario.password, this.selectedUsuario.permissions)
            .then(emp => {
                this.botonCerrar.nativeElement.click();
                // Limpio los valores asi no quedan en el Modal
                this.selectedUsuario = null;
                this.usuarioEditado.next(emp);
            });
    }
    checkPermission(permissions) {
        return SecurityUtils.checkPermissions(permissions);
    }

}
