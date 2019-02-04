import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { InicioComponent } from '../inicio/inicio.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { PacienteComponent } from '../paciente/paciente.component';
import { MedicamentoComponent } from '../medicamento/medicamento.component';
import { PedidoComponent } from '../pedido/pedido.component';
import { RepartidorComponent } from '../repartidor/repartidor.component';
import { MedicoComponent } from '../medico/medico.component';
import { CalendarioComponent } from "../calendario/calendario.component";
import { ObraSocialComponent } from '../obaraSocial/obraSocial.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
            { path: 'inicio', component: InicioComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'pacientes', component: PacienteComponent },
            { path: 'medicamentos', component: MedicamentoComponent },
            { path: 'pedidos', component: PedidoComponent },
            { path: 'repartidores', component: RepartidorComponent },
            { path: 'medicos', component: MedicoComponent },
            { path: 'calendario', component: CalendarioComponent },
            { path: 'obras', component: ObraSocialComponent }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
