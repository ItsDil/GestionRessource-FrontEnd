import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {MembersComponent} from "./components/members/members.component";
import {BesoinsComponent} from "./components/besoins/besoins.component";
import {SignalePanneComponent} from "./components/signale-panne/signale-panne.component";
import {AddTechnicienComponent} from "./components/add-technicien/add-technicien.component";
import {GererPanneTechComponent} from "./components/gerer-panne-tech/gerer-panne-tech.component";
import {AppelOffreComponent} from "./components/appel-offre/appel-offre.component";

const routes: Routes = [
  {path:"", redirectTo :"signin", pathMatch:"full" },
  {path:"signin", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"gestionMembers", component: MembersComponent},
  {path:"home", component: HomeComponent, canActivate:[AuthGuard],
    children:[
      {path:"gestionMembers", component: MembersComponent},
      {path:"gestionBesoins", component: BesoinsComponent},
      {path:"signalPanne", component: SignalePanneComponent},
      {path:"addTechnicien", component: AddTechnicienComponent},
      {path:"gererPanneTech", component: GererPanneTechComponent},
      {path:"appelOffre", component: AppelOffreComponent},

    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
