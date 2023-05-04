import {Component, OnInit} from '@angular/core';
import {PanneDTO_Tech} from "../../model/PanneDTO_Tech";
import {RessourceDTO_Panne} from "../../model/RessourceDTO_Panne";
import {PanneDTO_Dep} from "../../model/PanneDTO_Dep";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PannesDTO} from "../../model/PannesDTO";

@Component({
  selector: 'app-gerer-panne-tech',
  templateUrl: './gerer-panne-tech.component.html',
  styleUrls: ['./gerer-panne-tech.component.css']
})
export class GererPanneTechComponent implements  OnInit{

  public panneDtoTech!:PanneDTO_Tech;
  public formFilterPanne! : FormGroup;
  public panneDepInfo!:PanneDTO_Dep;
  public panneDepMath!:PanneDTO_Dep;
  public showPannesFiltred!: PanneDTO_Dep;
  public panneConstat!:any;

  constructor(private fb : FormBuilder,) {
    this.formFilterPanne = this.fb.group({
      byDepart:this.fb.control("Informatique"),
      byStatus : this.fb.control("Panne"),
    });

    this.showPannesFiltred = {
      pannes:[],
      departementName:''
    }

  }

  ngOnInit(): void {

    this.panneDtoTech = {
      panneDTODeps:[
        {
          departementName:"Informatique",
          pannes:[
            {
              idPanne:1,
              idMember:8,
              firstname:"Gholam",
              email:"Gho@gmail.com",
              ressource:{
                id:-1,
                codeBarre:"codecode",
                cpu:"i7",
                stockage:"256",
                ram:"8",
                ecran:"15.6'"
              },
              isThreated :true,
              datePanne :"2021-02-21",
              dateDemande :"2021-03-21"

            },
            {
              idPanne:2,
              idMember:8,
              firstname:"Gholam",
              email:"Gho@gmail.com",
              ressource:{
                id:-1,
                codeBarre:"codecode2",
                vitesse:"50",
                resolution:"1960-1080"
              },
              isThreated :false,
              datePanne :"2021-03-21",
              dateDemande :"2021-03-21"

            }
          ]
        },
        {
          departementName:"Mathematique",
          pannes:[
            {
              idPanne:3,
              idMember:9,
              firstname:"Gholam2",
              email:"Gho2@gmail.com",
              ressource:{
                id:-1,
                codeBarre:"codecode3",
                cpu:"i7",
                stockage:"256",
                ram:"8",
                ecran:"15.6'"
              },
              isThreated :true,
              datePanne :"2021-03-21",
              dateDemande :"2021-03-21"

            },
            {
              idPanne:4,
              idMember:9,
              firstname:"Gholam2",
              email:"Gho2@gmail.com",
              ressource:{
                id:-1,
                codeBarre:"codecode4",
                vitesse:"20",
                resolution:"720-480"
              },
              isThreated :false,
              datePanne :"2021-04-21",
              dateDemande :"2021-03-21"

            }
          ]

        }
      ]
    }


    this.panneDepInfo= this.panneDtoTech.panneDTODeps.filter(dep=>dep.departementName=="Informatique")[0]
    this.panneDepMath= this.panneDtoTech.panneDTODeps.filter(dep=>dep.departementName=="Mathematique")[0]


    this.handleShowPanneByDep()

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
    let status  = this.formFilterPanne.get('byStatus')!.value
    if(status=="Panne") {
      this.showPannesFiltred.pannes = this.showPannesFiltred.pannes.filter(p => p.isThreated == false);

    }else if(status=="Traitée") {
      this.showPannesFiltred.pannes = this.showPannesFiltred.pannes.filter(p => p.isThreated == true);

    }

  }

  handleShowPanneByStatus() {
    let status  = this.formFilterPanne.get('byStatus')!.value
    if(status=="Panne") {
      this.showPannesFiltred.pannes = this.showPannesFiltred.pannes.filter(p => p.isThreated == false);

    }else if(status=="Traitée") {
      this.showPannesFiltred.pannes = this.showPannesFiltred.pannes.filter(p => p.isThreated == true);

    }
      this.handleShowPanneByDep()
  }

  handleSetStatus(panne: PannesDTO) {

    let status  = panne.isThreated;
    // if (!status) {
    //   panne.isThreated = true;
    // }else {
    //   panne.isThreated = false;
    // }

    let departName:string = this.formFilterPanne.get('byDepart')!.value

    if(departName=="Informatique") {

      const temp = this.panneDepInfo.pannes.find(pp => pp.idPanne === panne.idPanne);

      if (temp) {

        temp.isThreated = !status

        this.panneDepInfo.pannes = this.panneDepInfo.pannes.map(pp => pp.idPanne === temp.idPanne ? temp : pp);
      }
    }else if(departName=="Mathematique") {

      const temp = this.panneDepMath.pannes.find(pp => pp.idPanne === panne.idPanne);

      if (temp) {

        temp.isThreated = !status

        this.panneDepMath.pannes = this.panneDepMath.pannes.map(pp => pp.idPanne === temp.idPanne ? temp : pp);
      }
    }


    this.handleShowPanneByStatus()
  }




  handleGenConstat(panne:any) {

    const container = document.getElementById("openModelGeneConstat");
    const button  = document.createElement('button');
    button.type ="button";
    button.style.display = "none";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target','#zoomupModal_GeneConstat');


    if(container) {
      container.appendChild(button);

      this.panneConstat = panne;
    }
    button.click();

  }
}
