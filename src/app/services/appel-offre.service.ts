import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Added_Besoin} from "../model/Besoin";
import {Observable} from "rxjs";
import {appelOffre} from "../model/appelOffre";
import {BesoinValide} from "../model/BesoinsValide";

@Injectable({
  providedIn: 'root'
})
export class AppelOffreService {

  backHost :string="http://localhost:8080/api/v1";

  constructor(private http : HttpClient, private router: Router) {}

  public getMiniAppelOffre(id:number):Observable<appelOffre>{
    return this.http.get<appelOffre>(this.backHost+"/Besoin-Controller/appel-offre/"+id);
  }



  public MiniAppleOffreValider(besoinValider:BesoinValide):Observable<void>{
    return this.http.post<void>(this.backHost+"/Besoin-Controller/appel-offre-validation",besoinValider)
  }



}
