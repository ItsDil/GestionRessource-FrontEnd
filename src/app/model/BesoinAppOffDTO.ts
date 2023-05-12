import {Imprimante, Ordinateur} from "./Ressource";
import {BesoinDTO} from "./BesoinDTO";

export interface BesoinAppOffDTO {


  firstname : string;
  email:string;
  departement:string;
  besoinDTO : BesoinDTO[];

}
