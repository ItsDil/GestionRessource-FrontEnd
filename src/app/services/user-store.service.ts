import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullname$ = new BehaviorSubject<string>("");
  private roleName$ = new BehaviorSubject<string>("");


  constructor() { }


  public getRoleFromStore(){
    return this.roleName$.asObservable();

  }

  public setRoleForStore(role:string){
    this.roleName$.next(role)
  }


  public getFirstNameFromStore(){
    return this.fullname$.asObservable();
  }


  public setFirstNameForStore(fullname:string){
    this.fullname$.next(fullname);
  }

}
