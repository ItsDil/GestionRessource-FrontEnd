import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MemberDepart} from "../../model/MemberDepart";
import {Technicien} from "../../model/Technicien";
import {MembersDepartService} from "../../services/members-depart.service";

@Component({
  selector: 'app-add-technicien',
  templateUrl: './add-technicien.component.html',
  styleUrls: ['./add-technicien.component.css']
})
export class AddTechnicienComponent implements OnInit{
  public formAddTech! : FormGroup;
  public users:any = [];

  constructor(private  memberDep : MembersDepartService,private fb : FormBuilder) {
  }
  ngOnInit(): void {
    this.handleGetAllTech();
    this.formAddTech = this.fb.group({
      firstname : this.fb.control(null,[Validators.required]),
      lastname : this.fb.control(null,[Validators.required]),
      email : this.fb.control(null,[Validators.required]),
      password : this.fb.control(null,[Validators.required]),
      roles : this.fb.control(null),
      speciality : this.fb.control(null,[Validators.required])
    });

  }

  handleAddTech(){
    console.log(this.formAddTech.value);



    let user:Technicien;


    user= {
      id: null,
      firstname:this.formAddTech.get("firstname")?.value,
      lastname:this.formAddTech.get("lastname")?.value,
      password:this.formAddTech.get("password")?.value,
      email:this.formAddTech.get("email")?.value,
      roles:[{roleID:-1,rolename:"TECH"}],
      speciality:this.formAddTech.get("speciality")?.value
    }

    // console.log(this.rownodes);

    this.memberDep.addTech(user).subscribe({
      next : (data)=>{
        this.users.push(user);
      },
      error: (err)=>{
        console.log("err addMemeber Technicien: "+err)
      }
    });



  }
  handleGetAllTech(){
    this.memberDep.getAllTechnicien().subscribe({
      next : (data)=>{
        console.log("users :"+data)
        this.users=data;
      },error : (err) => {

      }
    });
  }
}
