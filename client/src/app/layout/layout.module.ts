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
import { CalendarioComponent } from '../calendario/calendario.component';
import { ObraSocialComponent } from '../obraSocial/obraSocial.component';
import { AsignarMedicamentoComponent } from '../asignar_medicamento/asignar_medicamento.component';
import { FarmaciaComponent } from '../farmacia/farmacia.component';
import { ClinicaComponent } from '../clinica/clinica.component';


// SERVICIOS
import { MedicoService } from '../medico/medico.service';
import { RepartidorService } from '../repartidor/repartidor.service';
import { ObraService } from '../obraSocial/obraSocial.service';
import { MedicamentoService} from '../medicamento/medicamento.service';
import {PacienteService} from '../paciente/paciente.service';
import {PedidoService} from '../pedido/pedido.service';
import { AsignarMedicamentoService } from '../asignar_medicamento/asignar_medicamento.service';
import { FarmaciaService } from '../farmacia/farmacia.service';
import { ClinicaService } from '../clinica/clinica.service';


// PrimeNG
import {AccordionModule, CalendarModule} from 'primeng/primeng';
import { SharedModule, PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/button';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/components/table/table';
import { WINDOW_PROVIDERS } from '../shared/WindowProvider/window.provider';
import { UrlService } from '../shared/WindowProvider/window.provider.service';
import { DialogModule } from 'primeng/dialog';
import { AsignarMedicoComponent } from '../asignar_medico/asignar_medico.component';
import { AsignarMedicoService } from '../asignar_medico/asignar_medico.service';
import { AsignarObraComponent } from '../asignar_obra/asignar_obra.component';
import { AsignarObraSocialService } from '../asignar_obra/asignar_obra.service';
import { AsignarClinicaService } from '../asignar_clinica/asignar_clinica.service';
import { AsignarClinicaComponent } from '../asignar_clinica/asignar_clinica.component';
import { AsignarMedicamentoFarmaciaComponent } from '../asignar_medicamento_farmacia/asignar_medicamento_farmacia.component';
import { AsignarMedicamentoFarmaciaService } from '../asignar_medicamento_farmacia/asignar_medicamento_farmacia.service';


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
        CalendarioComponent,
        ObraSocialComponent,
        FarmaciaComponent,
        ClinicaComponent,
        AsignarMedicamentoComponent,
        AsignarMedicoComponent,
        AsignarObraComponent,
        AsignarClinicaComponent,
        AsignarMedicamentoFarmaciaComponent
    ],
    providers: [
        WINDOW_PROVIDERS,
        UrlService,
        MedicoService,
        ObraService,
        RepartidorService,
        MedicamentoService,
        PacienteService,
        PedidoService,
        AsignarMedicamentoService,
        FarmaciaService,
        ClinicaService,
        AsignarMedicoService,
        AsignarObraSocialService,
        AsignarClinicaService,
        AsignarMedicamentoFarmaciaService
    ]
})
export class LayoutModule {}
