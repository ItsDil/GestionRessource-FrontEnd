import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {roles, User} from "../../model/User";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {UserStoreService} from "../../services/user-store.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginFormGroup!: FormGroup;
   user! : User;
   auth!: string;

  constructor(private fb : FormBuilder,
              private loginService : LoginService,
              private router: Router,
              private toast:NgToastService,
              private userStore: UserStoreService) {

  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email : this.fb.control('', [Validators.required, Validators.email]),
      password : this.fb.control('', [Validators.required,])
    });

  }


  handleLogin() {
    let useEmail = this.loginFormGroup.get("email")?.value;
    let password = this.loginFormGroup.get("password")?.value;

    this.loginService.sinIn(useEmail,password).subscribe({
      next : (data)=> {

        console.log(data.access_token);
        this.loginService.storeToken(data.access_token);
        this.loginService.storeRefreshToken(data.refresh_token);

        const tokenPayload = this.loginService.decodedToken();

        this.userStore.setFirstNameForStore(tokenPayload.firstName);

        tokenPayload.roles.forEach((role:roles)=>{
          this.userStore.setRoleForStore(role.rolename);
        });

        sessionStorage.setItem('reloadAfterRedirect', 'true');
        this.router.navigate(["home"])



      }
      ,error : (err)=>{
        console.log("hhhh : "+err.status)
        this.toast.error({detail:"Error",summary:"Bad Credantial !!!"});

      }
    })
  }



}
