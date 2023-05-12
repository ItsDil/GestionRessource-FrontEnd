import {Component, OnInit} from '@angular/core';
import {AppelOffreDTOFour} from "../../model/AppelOffreDTOFour";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppelOffreCompleteService} from "../../services/appel-offre-complete.service";
import Swal from "sweetalert2";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-offre-four',
  templateUrl: './offre-four.component.html',
  styleUrls: ['./offre-four.component.css']
})
export class OffreFourComponent implements OnInit{

  // public futureOffre! : AppelOffreDTOFour;
  public formPostuler! : FormGroup;
  public price: number=0;
  public futureOffre!: AppelOffreDTOFour;
  constructor(private loginService : LoginService, private appelOffreCompleteService : AppelOffreCompleteService, private fb : FormBuilder) {
  }

  ngOnInit(): void {

    // this.futureOffre = {
    //
    //   firstnameResp:"admin",
    //   idFournisseur:-1,
    //   dateOffre:"",
    //   prix:-1,
    //   idAppelOffr:-1,
    //   idBesoins:[1,2],
    //   imprimanteGroups:[
    //     {
    //       vitesse:20,
    //       resolution:"1960-1080",
    //       count:2
    //     },
    //     {
    //       vitesse:50,
    //       resolution:"720-480",
    //       count:3
    //     },
    //   ],
    //   ordinateurGroups:[
    //     {
    //       cpu:"i7",
    //       ram:8,
    //       stockage:"256",
    //       ecran:"15.6'",
    //       count:4
    //     },
    //     {
    //       cpu:"i5",
    //       ram:16,
    //       stockage:"512",
    //       ecran:"16'",
    //       count:8
    //     }
    //   ]
    //
    // }
    this.formPostuler = this.fb.group({
      prix : this.fb.control(0)
    })

    this.handleShowFutureOffre()
  }


  handleShowFutureOffre(){
    let idFour:number = this.loginService.getIdMemeber();
    console.log("",idFour);
    this.appelOffreCompleteService.getFutureOffre(idFour).subscribe({
      next: (data)=>{
        this.futureOffre = data;
        console.log("this is is : ",data)
      },
      error: (err)=>{

      }
    })
  }

  handleShowOffre() {

    const container = document.getElementById("openModelShowOffre");
    const button  = document.createElement('button');
    button.type ="button";
    button.style.display = "none";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target','#zoomupModal_ShowOffre');


    if(container) {
      container.appendChild(button);

      // this.panneConstat = panne;
    }
    button.click();

  }

  handlePostuleOffre() {

    this.price = this.formPostuler.get("prix")?.value
    let idFour:number = this.loginService.getIdMemeber();

    this.futureOffre.prix = this.price;
    this.futureOffre.idFournisseur = idFour;
    this.appelOffreCompleteService.createOffre(this.futureOffre).subscribe({
      next: (data)=>{

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Creation Avec Success',
          showConfirmButton: false,
          timer: 1500
        })

      },
      error: (err)=>{
          console.log(err)
      }
    })

  }
}
