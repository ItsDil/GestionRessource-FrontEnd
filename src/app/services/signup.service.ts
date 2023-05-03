import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {jwt_} from "../model/Jwt_";
import {User} from "../model/User";
import {Fournisseur} from "../model/Fournisseur";


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  backHost :string="http://localhost:8080/api/v1";

  constructor(private http : HttpClient, private router: Router) { }


  public signUp(user:Fournisseur):Observable<jwt_>{

    return this.http.post<jwt_>(this.backHost+"/auth/register",user);
  }


}
