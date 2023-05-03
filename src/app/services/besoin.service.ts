import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MemberDepart} from "../model/MemberDepart";
import {Observable} from "rxjs";
import {jwt_} from "../model/Jwt_";
import {Added_Besoin} from "../model/Besoin";

@Injectable({
  providedIn: 'root'
})
export class BesoinService implements OnInit{

  backHost :string="http://localhost:8080/api/v1";

  constructor(private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  public addBesoin(besoin:Added_Besoin):Observable<void>{

     return this.http.post<void>(this.backHost+"/Besoin-Controller/save",besoin);
  }

}
