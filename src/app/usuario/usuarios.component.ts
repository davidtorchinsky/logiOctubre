import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';
import { UsuarioService } from './user.service';
import {Permission} from './permission';
import {PermissionService} from './permission.service';
import {SecurityUtils} from '../SecurityUtils';

declare var $: any;

@Component({
    selector: 'mis-usuarios',
    templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[];
    selectedUsuario: Usuario;
    permissions: Permission[];

    selectedUsuarioLocal: Usuario;
    permisionEdit = false;
    initializedTablePermissions = false;
    usuarioEdit = false;

    constructor(
        private router: Router,
        private usuarioService: UsuarioService,
        private permissionService: PermissionService
    ) { }

    getUsuarios(): void {
        this.usuarioService
            .getUsuarios()
            .then(users => {
                this.usuarios = users;
            });
    }

    getPermissions(): void {
        this.permissionService
            .getPermissions()
            .then(permissions => {
                this.permissions = permissions;
            });
    }

    onRowSelect(event) {
        this.usuarioEdit = true;
        if (!this.initializedTablePermissions) {
            this.initializedTablePermissions = true;
            this.iniciarTablaPermisos();
        }
    }
    hasPermision(id) {
        if (this.selectedUsuario.permissions) {
            for (let i = 0; i < this.selectedUsuario.permissions.length; i++) {
                if (this.selectedUsuario.permissions[i]._id === id) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    onAddUsuario(nuevoUsuario: Usuario) {
        this.usuarios = [...this.usuarios, nuevoUsuario];
    }

    ngOnInit(): void {
        this.getUsuarios();
        this.getPermissions();
    }

    onSelect(user: Usuario): void {
        // Hacemos unos clones
        this.selectedUsuario = Object.assign({}, user);
    }

    onClean(): void {
        // Hacemos unos clones
        this.selectedUsuario = null;
    }

    onEdit(est: boolean): void {
        this.usuarioEdit = est;
        this.selectedUsuarioLocal = this.selectedUsuario;
    }

    onSave(user: Usuario): void {
        this.usuarios.forEach(function(elem, index, array){
            if (elem._id === user._id) {
                this.usuarios[index] = user;
            }
        });
    }

    editPermissions() {
        this.permisionEdit = !this.permisionEdit;
        if (this.permisionEdit) {
            this.selectedUsuarioLocal = this.selectedUsuario;
        }
    }

    savePermissions() {
        this.usuarioService.updateUsuario(this.selectedUsuarioLocal._id, this.selectedUsuarioLocal.username,
            this.selectedUsuarioLocal.firstName, this.selectedUsuarioLocal.lastName,
            this.selectedUsuarioLocal.password, this.selectedUsuarioLocal.permissions)
            .then(usr => {
                this.getUsuarios();
                this.editPermissions();
            });

    }

    setPermissions(permission) {
        const index = this.selectedUsuarioLocal.permissions.findIndex(i => i._id === permission._id);
        if (index > -1) {
            this.selectedUsuarioLocal.permissions.splice(index, 1);
        } else {
            this.selectedUsuarioLocal.permissions.push(permission);
        }
    }

    checkPermission(permissions) {
        return SecurityUtils.checkPermissions(permissions);
    }


    iniciarTablaPermisos() {

        $(document).ready(function() {
            $('#dataTables-permisos').DataTable({
                responsive: true,
                'language': {
                    'decimal':        '',
                    'emptyTable':     'No existen permisos',
                    'info':           '_START_ a _END_ de _TOTAL_ permisos',
                    'infoEmpty':      ' 0 de 0 de 0 permisos',
                    'infoFiltered':   '(filtrado de _MAX_ permisos totales)',
                    'infoPostFix':    '',
                    'thousands':      ',',
                    'lengthMenu':     'Mostrar _MENU_ permisos',
                    'loadingRecords': 'Cargando...',
                    'processing':     'Procesando...',
                    'search':         'Buscar:',
                    'zeroRecords':    'No se encontraron permisos con esa condición',
                    'paginate': {
                        'first':      'Primero',
                        'last':       'Último',
                        'next':       'Siguiente',
                        'previous':   'Previo'
                    },
                    'aria': {
                        'sortAscending':  ': Activar para ordenar la columna ascendentemente',
                        'sortDescending': ': Activar para ordenar la columna descendentemente'
                    }
                }
            });
        });
    }
}
