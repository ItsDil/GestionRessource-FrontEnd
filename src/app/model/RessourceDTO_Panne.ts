

export interface RessourceDTO_Panne{
  id:number;
  codeBarre:string;
}
export interface Ordinateur extends RessourceDTO_Panne {
  cpu:String;
  stockage:String;
  ram:String;
  ecran:String;
}
export interface Imprimante extends RessourceDTO_Panne{
  vitesse:String;
  resolution:String;
}
