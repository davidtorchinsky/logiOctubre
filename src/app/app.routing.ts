import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {RouterModule} from '@angular/router'; // este es el modulo que me ayuda a moverme entre las rutas

import { LoginComponent } from './login/login.component';
import { BarraComponent } from './login/barra/barra.component';


export const routes: ModuleWithProviders = RouterModule.forRoot
  ([
    {path: 'login', component: LoginComponent},
    {path: 'barra', component: BarraComponent}]);
