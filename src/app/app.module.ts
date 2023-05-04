import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import {NgToastModule} from "ng-angular-popup";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './components/members/members.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BesoinsComponent } from './components/besoins/besoins.component';
import { SignalePanneComponent } from './components/signale-panne/signale-panne.component';
import { AddTechnicienComponent } from './components/add-technicien/add-technicien.component';
import { GererPanneTechComponent } from './components/gerer-panne-tech/gerer-panne-tech.component';
import { AppelOffreComponent } from './components/appel-offre/appel-offre.component';
import { GererConstatComponent } from './componenets/gerer-constat/gerer-constat.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MembersComponent,
    SidebarComponent,
    BesoinsComponent,
    SignalePanneComponent,
    AddTechnicienComponent,
    GererPanneTechComponent,
    AppelOffreComponent,
    GererConstatComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgToastModule
    ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
