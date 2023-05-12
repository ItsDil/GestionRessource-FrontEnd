import {AppelOffreDTOFour} from "./AppelOffreDTOFour";

export interface offreDTOResp {


  idAppelOffre: number,
  datePub : String,
  isAffected:boolean,
  idFournisseurAffected:number,
  appelOffreDTOFours : AppelOffreDTOFour[]

}
