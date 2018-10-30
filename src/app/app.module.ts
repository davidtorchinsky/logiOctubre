import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BarraComponent } from './login/barra/barra.component';
import {AuthenticationService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import { WINDOW_PROVIDERS} from './window.provider';
import { UrlService } from './window.provider.service';

import {routes} from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BarraComponent
  ],
  imports: [
    BrowserModule,
    routes
  ],
  providers: [
  AuthenticationService,
  AuthGuard,
  WINDOW_PROVIDERS,
  UrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
