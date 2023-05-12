import {Component, OnInit} from '@angular/core';
import {appelOffre} from "../../model/appelOffre";
import {BesoinValide} from "../../model/BesoinsValide";
import {FormBuilder} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {AppelOffreService} from "../../services/appel-offre.service";
import {AppelOffreCompleteService} from "../../services/appel-offre-complete.service";
import {AppelOffreDTO} from "../../model/AppelOffreDTO";
import Swal from "sweetalert2";

@Component({
  selector: 'app-appel-offre-complete',
  templateUrl: './appel-offre-complete.component.html',
  styleUrls: ['./appel-offre-complete.component.css']
})
export class AppelOffreCompleteComponent implements OnInit{

  public idMember! : number;
  public appelOffreComplete!:AppelOffreDTO;
  public  showingAllBesoin : string="";
  public  showingBesoin : string="";
  public besoin:any;
  public besoinValides!:BesoinValide;
  public miniAppels!:appelOffre;

  constructor(private appelOffreCompleteService : AppelOffreCompleteService,private fb : FormBuilder,private loginService : LoginService) {
  }

  ngOnInit(): void {
    this.idMember = this.loginService.getIdMemeber();

    this.appelOffreComplete = {
      besoinAppOffDTOS : [],
    }
    this.miniAppels = {
      besoinDTO : [],
    }
    this.besoinValides = {
      besoinChecked:[]
    }
    this.handleGetAppelOffreComplet()
  }

  private handleGetAppelOffreComplet() {
    this.appelOffreCompleteService.getAppleOffreComplete().subscribe({
      next: (data)=>{
        this.appelOffreComplete = data;
        console.log("this is : ",data)

      },
      error: (err)=>{

      }
    })
  }

  handleAddToBesoinChecked(idBesoin: number) {

  }

  handleSetShowingAllBesoin(emailFour: string) {
    if(emailFour==this.showingAllBesoin){
      this.showingAllBesoin = ""
    }else{
      this.showingAllBesoin = emailFour;

    }
  }


  handleShowBesoinDetail(besoin : any) {
    const container = document.getElementById("openModelShowBesoin");
    const button  = document.createElement('button');
    button.type ="button";
    button.style.display = "none";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target','#zoomupModal_ShowBesoin');


    if(container) {
      container.appendChild(button);

      const mySelect = document.getElementById('mySelect') as HTMLSelectElement;

      this.besoin=besoin;
    }
    button.click();
  }


  handleCreateAppelOffreComplete() {
    let nb = this.appelOffreComplete.besoinAppOffDTOS.length==2
    if(this.appelOffreComplete.besoinAppOffDTOS.length ==1) {


      Swal.fire({
        title: 'Est-tu sûr?',
        text: "C'est pas une appel offre complete, une département manquant",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui Créer'
      }).then((result) => {
        if (result.isConfirmed) {

          this.appelOffreCompleteService.CreateAppelOffre(this.appelOffreComplete).subscribe({
            next: (data)=>{
              this.appelOffreComplete = data;
              console.log("this is : ",data)
            },
            error: (err)=>{

            }
          })
          Swal.fire(
            'Crée!',
            'Creation Avec Success',
            'success'
          )
        }
      })
    }else{

      this.appelOffreCompleteService.CreateAppelOffre(this.appelOffreComplete).subscribe({
        next: (data)=>{
          this.appelOffreComplete = data;
          console.log("this is : ",data)
        },
        error: (err)=>{

        }
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Creation Avec Success',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }



}
