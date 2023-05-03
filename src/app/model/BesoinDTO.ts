import {Imprimante, Ordinateur} from "./Ressource";

export interface BesoinDTO {

  id:number;
  idBesoin:number;
  firstname : string;
  lastname: string;
  email:string;
  dateDemande:string;
  ordinateurs : Ordinateur[];
  imprimantes: Imprimante[];
}

