import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {LoginService} from "../services/login.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService :LoginService, private toast : NgToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const myToken = this.loginService.getToken();

    if(myToken){
      request = request.clone({
        setHeaders:{Authorization:`Bearer ${myToken}`}  //"Bearer "+myToken
      })
    }


    return next.handle(request).pipe(
      catchError((err:any)=>{

        if(err instanceof HttpErrorResponse){
          console.log("state of error : "+err.status);
          this.loginService.clearLocalStorage();

          if(err.status == 403){

            this.toast.warning({detail:"Warning", summary:"Token is Expired, Please LogIn Again ! "});
            this.router.navigate(['signin']);
            // return this.handle401Error(request,next);

          }
        }

        return throwError(()=> new Error("Some Other Error Occured ! "))

      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


      return this.loginService.refreshToken(localStorage.getItem("refreshToken")!).pipe(
        switchMap((authResponse:any)=>{
          this.loginService.storeToken(authResponse.access_token);
          this.loginService.storeRefreshToken(authResponse.refresh_token);
          return next.handle(this.addAccessToken(request,authResponse.access_token))
        }),
        catchError((err)=>{
          return throwError(()=>{
            this.toast.warning({detail:"Warning", summary:err.message()});
            this.router.navigate(['signin']);
          })
        })


      )

  }


  private addAccessToken(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

}
