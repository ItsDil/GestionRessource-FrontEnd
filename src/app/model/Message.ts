export interface Message {

  id:number;
  src:any;
  dest:number;
  idAppelOffre:number;
  message:string;
  isSeen:boolean;
  typeMsg:string
}



export enum TYPE_MSG{
  ONE_TO_ONE,
  ONE_TO_DEP,
  ONE_TO_ALL_FOUR
}
