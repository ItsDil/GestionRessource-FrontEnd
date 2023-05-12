import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {RessourcesDTO} from "../../model/RessourcesDTO";
import {LoginService} from "../../services/login.service";
import {BesoinService} from "../../services/besoin.service";
import {RessourcesDTOEns} from "../../model/RessourcesDTOEns";
import {PanneDTO_Ens} from "../../model/PanneDTO_Ens";
import Swal from "sweetalert2";

@Component({
  selector: 'app-signale-panne',
  templateUrl: './signale-panne.component.html',
  styleUrls: ['./signale-panne.component.css']
})
export class SignalePanneComponent implements OnInit{
  @ViewChild('zoomupModal_ShowRess') zoomupModal_ShowRess!: NgbModalRef;
  ressources:any[]=[];
  ress:any ;

  ressourceDtoense!: RessourcesDTOEns;



  constructor(private loginService : LoginService, private besoinService:BesoinService) {
  }

  ngOnInit(): void {
    let testImp = {
      id:1,
      typeRessource:"Imprimante",
      dateAjout:"2023-04-14",
      status:"Good",
      vitesse:"25",
      resolution:"1960-1080"
    }
    let testOrd={
      id:2,
      typeRessource:"Ordinateur",
      dateAjout:"2022-05-27",
      status:"Panne",
      cpu:"i7",
      stockage:"256",
      ram:"8Go",
      ecran:'16"'
    }

    this.ressources.push(testImp);
    this.ressources.push(testOrd);

    console.log(this.ressources)


    this.handleGetAllRessourcesEnse()


  }


  handleGetAllRessourcesEnse(){
    let idEnse:number = this.loginService.getIdMemeber();

    this.besoinService.getAllRessourceEnse(idEnse).subscribe({
      next: (data)=>{
        this.ressourceDtoense = data;

        console.log("this is all ress ense : ",data)
      },
      error: (err)=>{

      }
    })


  }


  handleShowRess(ressource:any) {

    const container = document.getElementById("openModelShowRess");
    const button  = document.createElement('button');
    button.type ="button";
    button.style.display = "none";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target','#zoomupModal_ShowRess');


    if(container) {
      container.appendChild(button);

      const mySelect = document.getElementById('mySelect') as HTMLSelectElement;
      // this.editedMemeber = user;

      this.ress=ressource;



      // setTimeout(() => {
      //   if(this.mySelectRef) {
      //     this.mySelectRef.nativeElement.value = user.roles[0].rolename;
      //   }
      // }, 0);
    }
    button.click();

  }


  handlCloseModalShowRess(): void {
    // fermer le modal en utilisant la fonction jQuery "modal" de Bootstrap
    if (this.zoomupModal_ShowRess) {
      this.zoomupModal_ShowRess.close();
    }
  }

  handleSetStatus(ress: any) {

    let status  = ress.etat;
    if (status)
      ress.etat = false;
    else
      ress.etat = true;


    let idEnse:number = this.loginService.getIdMemeber();
    let idRessource = ress.id;

    let panneDtoEnse : PanneDTO_Ens={
       idMembreDepartement:idEnse,
       idRessource:idRessource
    }

    this.besoinService.setPanne(panneDtoEnse).subscribe(
      {
        next : (data)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Modification Avec Success',
            showConfirmButton: false,
            timer: 1500
          })
          // console.log(this.products)
        },
        error : (err)=>{

        }
      });


  }
}
