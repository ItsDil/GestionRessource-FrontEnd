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
import {GererConstatComponent} from "./components/gerer-constat/gerer-constat.component";
import {AppelOffreCompleteComponent} from "./components/appel-offre-complete/appel-offre-complete.component";
import {OffreFourComponent} from "./components/offre-four/offre-four.component";
import {OffreRespComponent} from "./components/offre-resp/offre-resp.component";
import {AcceptOffreFourComponent} from "./components/accept-offre-four/accept-offre-four.component";
import {RoleGuardGuard} from "./guards/role-guard.guard";
import {ErrorsComponent} from "./components/errors/errors.component";

const routes: Routes = [
  {path:"", redirectTo :"signin", pathMatch:"full" },
  {path:"signin", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"errors", component: ErrorsComponent},
  {path:"gestionMembers", component: MembersComponent},
  {path:"home", component: HomeComponent, canActivate:[AuthGuard],
    children:[
      {path:"gestionMembers", component: MembersComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['RESP']}},
      {path:"gestionBesoins", component: BesoinsComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['ENSE']}},
      {path:"signalPanne", component: SignalePanneComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['ENSE']}},
      {path:"addTechnicien", component: AddTechnicienComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['RESP']}},
      {path:"gererPanneTech", component: GererPanneTechComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['TECH']}},
      {path:"appelOffre", component: AppelOffreComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['CHDP']}},
      {path:"gererConstat", component: GererConstatComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['RESP']}},
      {path:"appelOffreComplete", component: AppelOffreCompleteComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['RESP']}},
      {path:"offreFour", component: OffreFourComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['FOUR']}},
      {path:"offreResp", component: OffreRespComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['RESP']}},
      {path:"acceptOffreFour", component: AcceptOffreFourComponent, canActivate:[AuthGuard,RoleGuardGuard],
        data:{role:['FOUR']}},




    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
