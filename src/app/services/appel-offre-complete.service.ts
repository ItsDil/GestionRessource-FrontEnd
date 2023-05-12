import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AppelOffreDTO} from "../model/AppelOffreDTO";
import {AppelOffreDTOFour} from "../model/AppelOffreDTOFour";
import {offreDTOResp} from "../model/OffreDTOResp";
import {appleOffreDTOResp} from "../model/AppleOffreDTOResp";
import {OffreDTO} from "../model/OffreDTO";

@Injectable({
  providedIn: 'root'
})
export class AppelOffreCompleteService {

  backHost :string="http://localhost:8080/api/v1";

  constructor(private http : HttpClient, private router: Router) { }

  public getAppleOffreComplete():Observable<AppelOffreDTO>{
    return  this.http.get<AppelOffreDTO>(this.backHost+"/AppelOffre-Controller/appel-offre-valide")
  }

  public CreateAppelOffre(appelOffreDTO:AppelOffreDTO):Observable<any>{
    return this.http.post<any>(this.backHost+"/AppelOffre-Controller/save",appelOffreDTO)
  }

  public getFutureOffre(idFour:number):Observable<AppelOffreDTOFour>{
    return  this.http.get<AppelOffreDTOFour>(this.backHost+"/AppelOffre-Controller/ShowAppelOffre/"+idFour)
  }

  public createOffre(appelOffreDTOFour:AppelOffreDTOFour):Observable<offreDTOResp>{
    return  this.http.post<offreDTOResp>(this.backHost+"/AppelOffre-Controller/saveOffre",appelOffreDTOFour)
  }

  public getAllAppelOffre_Offres():Observable<appleOffreDTOResp>{
    return this.http.get<appleOffreDTOResp>(this.backHost+"/AppelOffre-Controller/ShowOffres");
  }

  public acceptOffre(idOffre : number):Observable<void>{
    return this.http.get<void>(this.backHost+"/Offre-Controller/accept/"+idOffre);
  }

  public getAllOffresFour(idFour : number):Observable<OffreDTO[]>{
    return this.http.get<OffreDTO[]>(this.backHost+"/Offre-Controller/Offres/"+idFour);
  }

  public affecterAppelOffer(idOffre : number):Observable<void>{
    return this.http.get<void>(this.backHost+"/Offre-Controller/affectAppelOffre/"+idOffre);
  }

  public bannerFour(idFour : number):Observable<void>{
    return this.http.get<void>(this.backHost+"/Offre-Controller/bannerFour/"+idFour);
  }


}
