import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {roles, User} from "../model/User";
import {jwt_} from "../model/Jwt_";
import {Router} from "@angular/router";
import {JwtHelperService} from '@auth0/angular-jwt'
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  backHost :string="http://localhost:8080/api/v1";
  private userPayload:any;


  constructor(private http : HttpClient, private router: Router) {
    this.userPayload=this.decodedToken();
  }


  public sinIn(email:string, password:string):Observable<jwt_>{

    // return this.http.get<User>(this.backHost+"/login?email="+email+"&password="+password);
    let Data = {email:email, password: password};
    return this.http.post<jwt_>(this.backHost+"/auth/authenticate",Data);
  }

  public signOut(){
    localStorage.clear();
    this.router.navigate(["signin"]);
  }


  public clearLocalStorage(){
    localStorage.clear();
  }

  storeToken(tokenValue:string){
    localStorage.setItem("token",tokenValue);
  }

  storeRefreshToken(tokenValue:string){
    localStorage.setItem("refreshToken",tokenValue);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getRefreshToken(){
    return localStorage.getItem("refreshToken");
  }


  isLoggedIn():boolean{
    return !!localStorage.getItem("token")
  }



  decodedToken(){
    const jwtHealper = new JwtHelperService()
    const token = this.getToken()!;
    console.log(jwtHealper.decodeToken(token))
    return jwtHealper.decodeToken(token);
  }

  getFirstNameFromToken(){
    if(this.userPayload)
      return this.userPayload.firstName
  }

  getIdMemeber(){
    if(this.userPayload){
      return this.userPayload.id
    }
  }

  getDepartMemeber(){
    if(this.userPayload){
      return this.userPayload.departement
    }
  }

  getRoleFromToken():any{
    if(this.userPayload){
      let rolename:string="";
      this.userPayload.roles.forEach((role:string)=>{
        rolename = role;
      });
      return rolename;
    }
  }

  getRoles():any{
    if(this.userPayload){
      return  this.userPayload.roles;
      console.log("jlgjelrg ",this.userPayload.roles)
    }
  }



  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }


  refreshToken(refreshToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + refreshToken
    });

    return this.http.post<any>(this.backHost+`/auth/refresh-token`, {}, { headers: headers });
  }



  getErrorsMessage(fieldName: string, errors: ValidationErrors) {

    if(errors['required']){
      return fieldName+" is Required !"
    }else if(errors['minlength']){
      return fieldName+" should have at least "+errors['minlength']['requiredLength']+" Characters";
    }else return "";

  }

}
