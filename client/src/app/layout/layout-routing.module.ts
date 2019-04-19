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
import { CalendarioComponent } from '../calendario/calendario.component';
import { ObraSocialComponent } from '../obraSocial/obraSocial.component';
import { AsignarMedicamentoComponent } from '../asignar_medicamento/asignar_medicamento.component';
import { AsignarMedicoComponent } from '../asignar_medico/asignar_medico.component';
import { FarmaciaComponent } from '../farmacia/farmacia.component';
import { ClinicaComponent } from '../clinica/clinica.component';
import { AsignarObraComponent } from '../asignar_obra/asignar_obra.component';
import { AsignarClinicaComponent } from '../asignar_clinica/asignar_clinica.component';
import { AsignarMedicamentoFarmaciaComponent } from '../asignar_medicamento_farmacia/asignar_medicamento_farmacia.component';
import { AsignarRepartidorComponent } from '../asignar_repartidor/asignar_repartidor.component';
import { HistorialPacienteComponent } from '../historial-paciente/historial-paciente.component';
import { QuitarMedicamentoComponent } from '../quitar_medicamento/quitar_medicamento.component';

import { PedidoEntregadoComponent } from '../pedido_entregado/pedido_entregado.component';
import { HistorialPedidosComponent } from '../historial-pedidos/historial-pedidos.component';

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
            { path: 'obras', component: ObraSocialComponent },
            { path: 'asignar_medicamento', component: AsignarMedicamentoComponent},
            { path: 'farmacias', component: FarmaciaComponent},
            { path: 'clinicas', component: ClinicaComponent},
            { path: 'asignar_medico', component: AsignarMedicoComponent},
            { path: 'asignar_obra', component: AsignarObraComponent},
            { path: 'asignar_clinica', component: AsignarClinicaComponent},
            { path: 'asignar_medicamento_farmacia', component: AsignarMedicamentoFarmaciaComponent},
            { path: 'asignar_repartidor', component: AsignarRepartidorComponent},
            { path: 'historial-paciente', component: HistorialPacienteComponent},
            { path: 'quitar_medicamento', component: QuitarMedicamentoComponent},
            { path: 'pedido_entregado', component: PedidoEntregadoComponent},
            { path: 'historial-pedidos', component: HistorialPedidosComponent},


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
