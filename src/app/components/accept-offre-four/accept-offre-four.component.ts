import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {AppelOffreCompleteService} from "../../services/appel-offre-complete.service";
import {FormBuilder} from "@angular/forms";
import {OffreDTO} from "../../model/OffreDTO";
import Swal from "sweetalert2";

@Component({
  selector: 'app-accept-offre-four',
  templateUrl: './accept-offre-four.component.html',
  styleUrls: ['./accept-offre-four.component.css']
})
export class AcceptOffreFourComponent implements OnInit{


  public OffresFour!: OffreDTO[];

  constructor(private loginService : LoginService, private appelOffreCompleteService : AppelOffreCompleteService, private fb : FormBuilder) {
  }
  ngOnInit(): void {

    this.handleShowAllOffresFour();

  }


  handleShowAllOffresFour(){
    let idFour:number = this.loginService.getIdMemeber();
    this.appelOffreCompleteService.getAllOffresFour(idFour).subscribe({
      next: (data)=>{
        this.OffresFour = data;
        console.log("this is All : ",data)
      },
      error: (err)=>{

      }
    })
  }

  handleAffectOffres(id: number) {
    this.appelOffreCompleteService.affecterAppelOffer(id).subscribe({
      next: (data)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Affectation Avec Success',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (err)=>{

      }
    })
  }
}
