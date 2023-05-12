import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Technicien} from "../model/Technicien";
import {Observable} from "rxjs";
import {jwt_} from "../model/Jwt_";
import {Message} from "../model/Message";

@Injectable({
  providedIn: 'root'
})
export class CanalMessagrieService {


  public backHost :string="http://localhost:8080/api/v1";

  constructor(private http : HttpClient, private router: Router) { }

  public sendMessage(message:Message):Observable<Message>{

     return this.http.post<Message>(this.backHost+"/Canal-Controller/save",message);
  }
  public getMssgByDepart(idSender:number):Observable<Message[]>{
    return this.http.get<Message[]>(this.backHost+"/Canal-Controller/getMsgDepart/"+idSender);
  }

}
