import {BesoinAppOffDTO} from "./BesoinAppOffDTO";
import {ImprimanteGroup} from "./ImprimanteGroup";
import {OrdinateurGroup} from "./OrdinateurGroup";

export interface AppelOffreDTOFour {

    idOffre:number;
    firstnameResp:string;
    idFournisseur:number;
    dateOffre:string;
    prix:number;
    idAppelOffr:number,
    idBesoins :number[];
    imprimanteGroups :ImprimanteGroup[]
    ordinateurGroups :OrdinateurGroup[];

}
