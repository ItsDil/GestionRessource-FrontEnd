import {RessourceDTO_Panne} from "./RessourceDTO_Panne";

export interface PannesDTO {
  idPanne:number;
  idMember: number;
  firstname:string;
  email:    string;
  ressource:any;
  isThreated : boolean;
  datePanne : string;
  dateDemande:string;
  constat:string;
  dateConstat:string;
  idFournisseur:number;
  firstnameFour:string;
  emailFour:string;
}
