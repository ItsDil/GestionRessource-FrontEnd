import {Component, OnInit} from '@angular/core';
import {offreDTOResp} from "../../model/OffreDTOResp";
import {appleOffreDTOResp} from "../../model/AppleOffreDTOResp";
import {AppelOffreDTOFour} from "../../model/AppelOffreDTOFour";
import {FormGroup} from "@angular/forms";
import {Message} from "../../model/Message";
import Swal from "sweetalert2";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {CanalMessagrieService} from "../../services/canal-messagrie.service";
import {UserStoreService} from "../../services/user-store.service";
import {AppelOffreCompleteService} from "../../services/appel-offre-complete.service";

@Component({
  selector: 'app-offre-resp',
  templateUrl: './offre-resp.component.html',
  styleUrls: ['./offre-resp.component.css']
})
export class OffreRespComponent implements OnInit{

  public listappelOffredtoResp!: appleOffreDTOResp;
  public idAppelOffreShowed:number=-1
  public offreShowedInModal:any;
  public formPostuler! : FormGroup;
  public idFourAccepted:number=-1;
  public role!: string|void ;


  constructor( private appelOffreCompleteService : AppelOffreCompleteService, private loginService : LoginService, private userStore: UserStoreService,  private router:Router, private canalMessagerieService: CanalMessagrieService) {
  }

  ngOnInit(): void {

    this.userStore.getRoleFromStore().subscribe(value => {
      let roleFromToken  = this.loginService.getRoleFromToken();
      this.role = value || roleFromToken;
    });

    // this.listappelOffredtoResp = {
    //   offreDTOResps : [
    //     {
    //       idAppelOffre: 1,
    //       datePub:"2023-05-06",
    //       isAffected:true,
    //       idFournisseurAffected:1,
    //       appelOffreDTOFour :[
    //         {
    //
    //           firstnameResp:"admin",
    //           idFournisseur:3,
    //           dateOffre:"",
    //           prix:-1,
    //           idAppelOffr:-1,
    //           idBesoins:[1,2],
    //           imprimanteGroups:[
    //             {
    //               vitesse:20,
    //               resolution:"1960-1080",
    //               count:2
    //             },
    //             {
    //               vitesse:50,
    //               resolution:"720-480",
    //               count:3
    //             },
    //           ],
    //           ordinateurGroups:[
    //             {
    //               cpu:"i7",
    //               ram:8,
    //               stockage:"256",
    //               ecran:"15.6'",
    //               count:4
    //             },
    //             {
    //               cpu:"i5",
    //               ram:16,
    //               stockage:"512",
    //               ecran:"16'",
    //               count:8
    //             }
    //           ]
    //
    //         },
    //         {
    //
    //           firstnameResp:"admin",
    //           idFournisseur:-11,
    //           dateOffre:"",
    //           prix:-1,
    //           idAppelOffr:-1,
    //           idBesoins:[1,2],
    //           imprimanteGroups:[
    //             {
    //               vitesse:20,
    //               resolution:"1960-1080",
    //               count:5
    //             },
    //             {
    //               vitesse:50,
    //               resolution:"720-480",
    //               count:5
    //             },
    //           ],
    //           ordinateurGroups:[
    //             {
    //               cpu:"i7",
    //               ram:8,
    //               stockage:"256",
    //               ecran:"15.6'",
    //               count:7
    //             },
    //             {
    //               cpu:"i5",
    //               ram:16,
    //               stockage:"512",
    //               ecran:"16'",
    //               count:5
    //             }
    //           ]
    //
    //         }
    //
    //       ]
    //
    //     }
    //   ]
    // }

    this.handleShowAllAppelOffre_Offres();


  }


  handleShowDetailOffre(offre: any) {
    const container = document.getElementById("openModelShowOffre");
    const button  = document.createElement('button');
    button.type ="button";
    button.style.display = "none";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target','#zoomupModal_ShowOffre');


    if(container) {
      container.appendChild(button);

      this.offreShowedInModal = offre;
    }
    button.click();

  }



  handleShowOffres(idAppelOffre: number) {
    this.idAppelOffreShowed = idAppelOffre;
    console.log(this.idAppelOffreShowed,"/",idAppelOffre)
  }

  handleAccepteOffre(offre: AppelOffreDTOFour) {

    this.idFourAccepted = offre.idFournisseur;
    this.handleNotifyFour(offre.idFournisseur );
    this.handleNotifyAllFour(offre.idFournisseur,this.idAppelOffreShowed);
    console.log("idOffer : ",offre.idOffre)
    this.appelOffreCompleteService.acceptOffre(offre.idOffre).subscribe({
      next: (data)=>{

        console.log("accept Okk !!! ")

      },
      error: (err)=>{

      }
    })
  }

  handleNotifyFour(idFour : number) {

    let idResp:number = this.loginService.getIdMemeber();

    let sender:any= {
      id:idResp,
      email:"",
      firstname:"",
      lastname:"",
      roles:[],
      password:"",
      departement:""
    }

    let receiver:any= {
      id:idFour,
      email:"",
      firstname:"",
      lastname:"",
      roles:[],
      password:"",
      departement:""
    }
    let message : Message = {
      id:-1,
      idAppelOffre:-1,
      typeMsg:"ONE_TO_ONE",
      message:"Félicitations ! Votre offre a été acceptée.",
      dest: receiver,
      src: sender,
      isSeen:false,
    }

    this.canalMessagerieService.sendMessage(message).subscribe({
      next: (data)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Envoi avec success',
          showConfirmButton: false,
          timer: 1500
        })
      },error : (err)=>{
        console.log(err)
      }
    });

  }
  handleNotifyAllFour(idFour : number,idAppelOffre : number) {

    let idResp:number = this.loginService.getIdMemeber();

    let sender:any= {
      id:idResp,
      email:"",
      firstname:"",
      lastname:"",
      roles:[],
      password:"",
      departement:""
    }

    let receiver:any= {
      id:idFour,
      email:"",
      firstname:"",
      lastname:"",
      roles:[],
      password:"",
      departement:""
    }
    let message : Message = {
      id:-1,
      idAppelOffre:idAppelOffre,
      typeMsg:"ONE_TO_ALL_FOUR",
      message:"Vérifier vos postulations .",
      dest: receiver,
      src: sender,
      isSeen:false,
    }

    this.canalMessagerieService.sendMessage(message).subscribe({
      next: (data)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Envoi avec success',
          showConfirmButton: false,
          timer: 1500
        })
      },error : (err)=>{
        console.log(err)
      }
    });

  }



  handleShowAllAppelOffre_Offres(){

    this.appelOffreCompleteService.getAllAppelOffre_Offres().subscribe({
      next: (data)=>{
        this.listappelOffredtoResp = data;
        console.log("This is all App Offre  : ",data)
        console.log("This is all App Offre  : ",this.listappelOffredtoResp)

      },
      error: (err)=>{
        console.log(err)
      }
    })
  }


  handleSetInBlackList(offre: AppelOffreDTOFour) {


    Swal.fire({
      title: 'Est-tu sûr?',
      text: "Voulez-vous vraiment banner ce fournisseur ? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui Créer'
    }).then((result) => {
      if (result.isConfirmed) {

        this.appelOffreCompleteService.bannerFour(offre.idFournisseur).subscribe({
          next: (data)=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Operation Avec Success',
              showConfirmButton: false,
              timer: 1500
            })

          },
          error: (err)=>{
            console.log(err)
          }
        })

      }
    })





  }
}
