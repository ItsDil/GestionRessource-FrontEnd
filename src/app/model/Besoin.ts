import {Imprimante, Ordinateur} from "./Ressource";

export interface Added_Besoin {

  idMembreDepartement : number;
  ordinateurs : Ordinateur[];
  imprimantes: Imprimante[];

}
