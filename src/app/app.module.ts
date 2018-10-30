import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BarraComponent } from './login/barra/barra.component';
import {AuthenticationService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import { WINDOW_PROVIDERS} from './window.provider';
import { UrlService } from './window.provider.service';
import {FormsModule} from '@angular/forms';


import {routes} from './app.routing';
import {HttpModule} from '@angular/http';
import {AlertService} from './alert/alert.service';
import {UsuarioService} from './usuario/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BarraComponent
  ],
  imports: [
    BrowserModule,
    routes,
    HttpModule,
    FormsModule

  ],
  providers: [
  AuthenticationService,
  AuthGuard,
  WINDOW_PROVIDERS,
  UrlService,
  AlertService,
  UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
