import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Fournisseur} from "../model/Fournisseur";
import {Observable} from "rxjs";
import {jwt_} from "../model/Jwt_";
import {MemberDepart} from "../model/MemberDepart";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class MembersDepartService {

  public backHost :string="http://localhost:8080/api/v1";

  constructor(private http : HttpClient, private router: Router) { }



  getUsers(){
    return this.http.get<any>(this.backHost+"/demo-Controller/members")
  }


  public addMember(user:MemberDepart):Observable<jwt_>{

    return this.http.post<jwt_>(this.backHost+"/auth/register",user);
  }


  public editMember(id:number,user:MemberDepart):Observable<MemberDepart>{

    return this.http.put<MemberDepart>(this.backHost+"/auth/edit-memeber/"+id,user);

  }


  public deleteMemeber(id:number):Observable<void>{

     return this.http.delete<void>(this.backHost+"/auth/delete-memeber/"+id);

  }



}
