import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";
import{NgToastService} from "ng-angular-popup"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: LoginService, private router: Router, private toast : NgToastService) {
  }

  canActivate():boolean{

    if(this.auth.isLoggedIn()){
      this.toast.success({detail:"Success",summary:'Welcome to home page !'});

      return true;
    }else{
      this.toast.error({detail:"ERROR",summary:'Please Login First !'});
      this.router.navigate(["signin"])

      return false;
    }


  }

}
