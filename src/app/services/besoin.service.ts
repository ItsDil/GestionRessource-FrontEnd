import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MemberDepart} from "../model/MemberDepart";
import {Observable} from "rxjs";
import {jwt_} from "../model/Jwt_";
import {Added_Besoin} from "../model/Besoin";
import {MemeberDTO} from "../model/MemeberDTO";
import {RessourcesDTO} from "../model/RessourcesDTO";
import {RessourcesDTOEns} from "../model/RessourcesDTOEns";
import {PanneDTO_Ens} from "../model/PanneDTO_Ens";
import {PanneDTO_Tech} from "../model/PanneDTO_Tech";
import {PanneDTO_Constat} from "../model/PanneDTO_Constat";

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


  public getAllRessourceEnse(idEnse:number):Observable<RessourcesDTOEns>{

    return this.http.get<RessourcesDTOEns>(this.backHost+"/Panne-Controller/getRessourceWithState/"+idEnse);
  }
  public setPanne(panneEnse:PanneDTO_Ens):Observable<void>{

    return this.http.post<void>(this.backHost+"/Panne-Controller/setPanne",panneEnse);
  }

  public getAllPannesTechnicien():Observable<PanneDTO_Tech>{

    return this.http.get<PanneDTO_Tech>(this.backHost+"/Panne-Controller/Technicien");
  }

  public setEtat(idPanne:number):Observable<void>{

    return this.http.get<void>(this.backHost+"/Panne-Controller/setEtat/"+idPanne);
  }

  public setConstat(panneDTOConstat:PanneDTO_Constat):Observable<void>{

    return this.http.post<void>(this.backHost+"/Panne-Controller/setConstat",panneDTOConstat);
  }

  public getAllPannesResponsable():Observable<PanneDTO_Tech>{

    return this.http.get<PanneDTO_Tech>(this.backHost+"/Panne-Controller/Responsable");
  }



}
