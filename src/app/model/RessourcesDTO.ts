

export interface RessourcesDTO{
    id :number;
    codeBarre:string;
    dateFinGarantie:string;
    dateDemande:string;
    typeRessource:string;
    etat:boolean;
    isTraited:boolean;
    imprOrd:ImprOrd;


}

export interface ImprOrd {
  resolution:string;
  vitesse:number;
  cpu:string;
  ram:number;
  stockage:string;
  ecran:string;
}
