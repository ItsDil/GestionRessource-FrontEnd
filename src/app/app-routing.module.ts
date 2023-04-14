import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path:"", redirectTo :"signin", pathMatch:"full" },
  {path:"signin", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"home", component: HomeComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
