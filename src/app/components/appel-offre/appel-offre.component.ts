import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {appelOffre} from "../../model/appelOffre";
import {AppelOffreService} from "../../services/appel-offre.service";
import {BesoinValide} from "../../model/BesoinsValide";
import Swal from "sweetalert2";

@Component({
  selector: 'app-appel-offre',
  templateUrl: './appel-offre.component.html',
  styleUrls: ['./appel-offre.component.css']
})
export class AppelOffreComponent implements OnInit{

  public idMember! : number;
  public miniAppels!:appelOffre;
  public  showingBesoin : number=-1;
  public ress:any;
  public besoinValides!:BesoinValide;
  constructor(private fb : FormBuilder,private loginService : LoginService, private appelOffreService : AppelOffreService) {
  }

  ngOnInit(): void {

    this.idMember = this.loginService.getIdMemeber();

    this.miniAppels = {
      besoinDTO : [],
    }
    this.besoinValides = {
      besoinChecked:[]
    }

    this.handleGetMiniAppelOffre()
  }

  handleGetMiniAppelOffre(){
    this.appelOffreService.getMiniAppelOffre(this.idMember).subscribe({
      next: (data)=>{
        this.miniAppels = data;
        console.log(data)

      },
      error: (err)=>{

      }
    })

  }

  handleShowRessourceDetail(ressource : any) {
    const container = document.getElementById("openModelShowRess");
    const button  = document.createElement('button');
    button.type ="button";
    button.style.display = "none";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target','#zoomupModal_ShowRess');


    if(container) {
      container.appendChild(button);

      const mySelect = document.getElementById('mySelect') as HTMLSelectElement;

      this.ress=ressource;


    }
    button.click();
  }


  handleSetShowingBesoin(idBesoin: number) {
    if(idBesoin==this.showingBesoin){
      this.showingBesoin = -1
    }else{
      this.showingBesoin = idBesoin;

    }

  }

  handleAddToBesoinChecked(idBesoin: number) {

    let indice = 0;

    for (let i of this.besoinValides.besoinChecked) {
      if (i == idBesoin) {
        indice = i;
        console.log("kayn")
      }
    }
    console.log()

    if (indice == 0) {
      this.besoinValides.besoinChecked.push(idBesoin);
    } else {
      const indexToRemove = this.besoinValides.besoinChecked.indexOf(indice);
      if (indexToRemove !== -1) {
        this.besoinValides.besoinChecked.splice(indexToRemove, 1)
      }
    }
    console.log("checked : " + this.besoinValides.besoinChecked)

  }

  handleMiniAppelOffreValider() {
    this.appelOffreService.MiniAppleOffreValider(this.besoinValides).subscribe({
      next: (data)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Validation Avec Success ',
          showConfirmButton: false,
          timer: 1500
        })
        this.showingBesoin = -1;

        this.uncheckInputsByClassName('inputBesoinChecked');
      },
      error: (err)=>{

      }

    })
  }
   uncheckInputsByClassName(className: string): void {
    const inputs = document.querySelectorAll(`.${className}`) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      if (input.type === 'checkbox' && input.checked) {
        input.checked = false;
      }
    });
  }
}
