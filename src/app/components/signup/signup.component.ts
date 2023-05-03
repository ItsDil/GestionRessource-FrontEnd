import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {roles, User} from "../../model/User";
import {SignupService} from "../../services/signup.service";
import {Router} from "@angular/router";
import {Fournisseur} from "../../model/Fournisseur";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signUpFormGroup! : FormGroup;

  constructor(private fb : FormBuilder, private sinupService : SignupService, private router:Router, private toast: NgToastService) {
  }

  ngOnInit(): void {

    this.signUpFormGroup = this.fb.group({
      firstname : this.fb.control(null),
      lastname : this.fb.control(null),
      email : this.fb.control(null),
      password : this.fb.control(null),
      roles : this.fb.control(null),
      society : this.fb.control(null)

    })

  }

  handleSignUp() {
     let user:Fournisseur;

     let rolename:string="";
     if(this.signUpFormGroup.get("roles")?.value == "Fournisseur")  rolename = "FOUR";
     user= {
       id: null,
       firstname:this.signUpFormGroup.get("firstname")?.value,
       lastname:this.signUpFormGroup.get("lastname")?.value,
       password:this.signUpFormGroup.get("password")?.value,
       email:this.signUpFormGroup.get("email")?.value,
       society:this.signUpFormGroup.get("society")?.value,
       roles:[{
         roleID:-1,
         rolename:rolename
       }]
     }

      this.sinupService.signUp(user).subscribe({
        next : (data)=>{

          this.router.navigate([""])


        },
        error : (err)=>{
          console.log("this error status : "+err.status)
          this.toast.warning({detail:"error", summary:err.error()});

        }

      });

  }
}
