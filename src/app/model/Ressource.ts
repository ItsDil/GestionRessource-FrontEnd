export interface Ressource{
  id:number;
  dateAjout:String;
}
export interface Ordinateur extends Ressource{
  cpu:String;
  stockage:String;
  ram:String;
  ecran:String;
}
export interface Imprimante extends Ressource{
  vitesse:String;
  resolution:String;
}
