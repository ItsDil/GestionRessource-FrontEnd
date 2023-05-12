 import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
 import {UserStoreService} from "../services/user-store.service";
 import {LoginService} from "../services/login.service";
 import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor( private toast : NgToastService,private userStore: UserStoreService,private loginService : LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let hasRole!:boolean;
    let roles!: string[]

    // this.userStore.getRoleFromStore().subscribe(res => {
    //   if (res.length != 0)
    //     roles = res;
    //   else
    //     roles = JSON.parse(localStorage.getItem('role')!);
    // });

    roles = this.loginService.getRoles()
    if (roles.some(item => route.data['role'].includes(item))) {
      hasRole = true;
    }
    else {
      this.toast.error({detail:"ERROR",summary:'Unauthorized access'});
      // this.router.navigate(['/errors'])
      hasRole = false;
    }
    return hasRole;
  }


}
