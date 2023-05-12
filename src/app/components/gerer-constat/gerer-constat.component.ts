import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PanneDTO_Tech} from "../../model/PanneDTO_Tech";
import {PanneDTO_Dep} from "../../model/PanneDTO_Dep";
import Swal from "sweetalert2";
import {AppelOffreCompleteService} from "../../services/appel-offre-complete.service";
import {BesoinService} from "../../services/besoin.service";

@Component({
  selector: 'app-gerer-constat',
  templateUrl: './gerer-constat.component.html',
  styleUrls: ['./gerer-constat.component.css']
})
export class GererConstatComponent implements OnInit{

  public formFilterPanne! : FormGroup;
  public panneDtoTech!:PanneDTO_Tech;
  public panneDepInfo!:PanneDTO_Dep;
  public panneDepMath!:PanneDTO_Dep;
  public showPannesFiltred!: PanneDTO_Dep;
  public panneConstat:any;

  constructor(private fb:FormBuilder, private besoinService : BesoinService) {
    this.formFilterPanne = this.fb.group({
      byDepart:this.fb.control("Informatique"),
    });

    this.showPannesFiltred = {
      pannes:[],
      departementName:''
    }

  }


  ngOnInit(): void {
    // this.panneDtoTech = {
    //   panneDTODeps:[
    //     {
    //       departementName:"Informatique",
    //       pannes:[
    //         {
    //           idPanne:1,
    //           idMember:8,
    //           firstname:"Gholam",
    //           email:"Gho@gmail.com",
    //           ressource:{
    //             id:-1,
    //             codeBarre:"codecode",
    //             dateFinGarantie:"2023-05-04",
    //             cpu:"i7",
    //             stockage:"256",
    //             ram:"8",
    //             ecran:"15.6'"
    //           },
    //           isThreated :true,
    //           datePanne :"2021-02-21",
    //           dateDemande :"2021-03-21",
    //           constat:"constat1 constat1 constat1 constat1 constat1 constat1 constat1 constat1 constat1 constat1 constat1 constat1 constat1 constat1 constat1",
    //           dateConstat:"2023-02-21",
    //           idFournisseur:-1,
    //           firstnameFour:"Four1",
    //           emailFour:"Four1@gmail.com"
    //         },
    //         {
    //           idPanne:2,
    //           idMember:8,
    //           firstname:"Gholam",
    //           email:"Gho@gmail.com",
    //           ressource:{
    //             id:-1,
    //             codeBarre:"codecode2",
    //             dateFinGarantie:"2023-05-05",
    //             vitesse:"50",
    //             resolution:"1960-1080"
    //           },
    //           isThreated :true,
    //           datePanne :"2021-03-21",
    //           dateDemande :"2021-03-21",
    //           constat:"constat2 constat2 constat2 constat2 constat2 constat2 constat2 constat2 constat2 constat2 constat2 constat2 constat2 constat2 constat2",
    //           dateConstat:"2023-03-21",
    //           idFournisseur:-1,
    //           firstnameFour:"Four1",
    //           emailFour:"Four1@gmail.com"
    //
    //         }
    //       ]
    //     },
    //     {
    //       departementName:"Mathematique",
    //       pannes:[
    //         {
    //           idPanne:3,
    //           idMember:9,
    //           firstname:"Gholam2",
    //           email:"Gho2@gmail.com",
    //           ressource:{
    //             id:-1,
    //             codeBarre:"codecode3",
    //             dateFinGarantie:"2023-05-03",
    //             cpu:"i7",
    //             stockage:"256",
    //             ram:"8",
    //             ecran:"15.6'"
    //           },
    //           isThreated :true,
    //           datePanne :"2021-03-21",
    //           dateDemande :"2021-03-21",
    //           constat:"constat3 constat3 constat3 constat3 constat3 constat3 constat3 constat3 constat3 constat3 constat3 constat3 constat3 constat3 constat3",
    //           dateConstat:"2023-04-21",
    //           idFournisseur:-2,
    //           firstnameFour:"Four2",
    //           emailFour:"Four2@gmail.com"
    //
    //         },
    //         {
    //           idPanne:4,
    //           idMember:9,
    //           firstname:"Gholam2",
    //           email:"Gho2@gmail.com",
    //           ressource:{
    //             id:-1,
    //             codeBarre:"codecode4",
    //             dateFinGarantie:"2023-05-06",
    //             vitesse:"20",
    //             resolution:"720-480"
    //           },
    //           isThreated :true,
    //           datePanne :"2021-04-21",
    //           dateDemande :"2021-03-21",
    //           constat:"constat4 constat4 constat4 constat4 constat4 constat4 constat4 constat4 constat4 constat4 constat4 constat4 constat4 constat4 constat4",
    //           dateConstat:"2023-05-21",
    //           idFournisseur:-2,
    //           firstnameFour:"Four2",
    //           emailFour:"Four2@gmail.com"
    //
    //         }
    //       ]
    //
    //     }
    //   ]
    // }
    this.handleGetAllPanneResp()

    this.handleShowPanneByDep()
  }

 handleGetAllPanneResp(){
   this.besoinService.getAllPannesResponsable().subscribe({
     next: (data)=>{

        this.panneDtoTech = data
        console.log("panneDtoTech : ",data)
       this.panneDepInfo= this.panneDtoTech.panneDTODeps.filter(dep=>dep.departementName=="Informatique")[0]
       this.panneDepMath= this.panneDtoTech.panneDTODeps.filter(dep=>dep.departementName=="Mathematique")[0]

       this.handleShowPanneByDep()
     },
     error: (err)=>{
       console.log(err)
     }
   })
 }

  handleShowPanneByDep() {
    let depart = this.formFilterPanne.get('byDepart')!.value
    if(depart){
      if(depart == "Informatique"){

        this.showPannesFiltred.pannes = this.panneDepInfo.pannes
        this.showPannesFiltred.departementName = this.panneDepInfo.departementName

      }else if(depart == "Mathematique"){
        this.showPannesFiltred.pannes = this.panneDepMath.pannes
        this.showPannesFiltred.departementName = this.panneDepMath.departementName

      }
    }


  }


  handleIsStillInGrantie(dateFinGarantie: string) {


// Créer un objet Date en passant la chaîne de caractères comme argument
    const dateObject = new Date(dateFinGarantie);

// Extraire les composantes de la date
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');

// Concaténer les composantes de la date dans le format yyyy-mm-dd
    const formattedDate = `${year}-${month}-${day}`;

// Obtenir la date actuelle dans le format yyyy-mm-dd
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = String(now.getMonth() + 1).padStart(2, '0');
    const nowDay = String(now.getDate()).padStart(2, '0');
    const nowFormatted = `${nowYear}-${nowMonth}-${nowDay}`;

// Comparer les dates formatées
    const isStillInGarantie = formattedDate > nowFormatted;
   return isStillInGarantie;
  }

  handleConstatShow(panne: any) {
    const container = document.getElementById("openModelConstatShow");
    const button  = document.createElement('button');
    button.type ="button";
    button.style.display = "none";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target','#zoomupModalConstatShow');


    if(container) {
      container.appendChild(button);

      this.panneConstat = panne;
    }
    console.log("dfbfbd: ", this.panneConstat)
    button.click();

  }
}
