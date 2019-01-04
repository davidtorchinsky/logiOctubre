import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// COMPONENTES
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { InicioComponent } from '../inicio/inicio.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { PacienteComponent } from '../paciente/paciente.component';
import { MedicamentoComponent } from '../medicamento/medicamento.component';
import { PedidoComponent } from '../pedido/pedido.component';
import { RepartidorComponent } from '../repartidor/repartidor.component';
import { MedicoComponent } from '../medico/medico.component';
import { CalendarioComponent } from "../calendario/calendario.component";

// SERVICIOS
import { MedicoService } from '../medico/medico.service';

// PrimeNG
import {AccordionModule, CalendarModule} from 'primeng/primeng';
import { SharedModule, PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/button';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/components/table/table';
import { WINDOW_PROVIDERS } from '../shared/WindowProvider/window.provider';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        HttpModule,
        FormsModule,
        HttpClientModule,
        AccordionModule,
        ButtonModule,
        PanelModule,
        SharedModule,
        DataTableModule,
        TableModule,
        DialogModule,
        CalendarModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        InicioComponent,
        UsuariosComponent,
        PacienteComponent,
        MedicamentoComponent,
        PedidoComponent,
        RepartidorComponent,
        MedicoComponent,
        CalendarioComponent
    ],
    providers: [
        WINDOW_PROVIDERS,
        UrlService,
        MedicoService
    ]
})
export class LayoutModule {}
