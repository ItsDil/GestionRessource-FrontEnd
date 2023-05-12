import {Component, OnInit} from '@angular/core';
import {PanneDTO_Tech} from "../../model/PanneDTO_Tech";
import {RessourceDTO_Panne} from "../../model/RessourceDTO_Panne";
import {PanneDTO_Dep} from "../../model/PanneDTO_Dep";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PannesDTO} from "../../model/PannesDTO";
import Swal from "sweetalert2";
import {BesoinService} from "../../services/besoin.service";
import {PanneDTO_Constat} from "../../model/PanneDTO_Constat";

@Component({
  selector: 'app-gerer-panne-tech',
  templateUrl: './gerer-panne-tech.component.html',
  styleUrls: ['./gerer-panne-tech.component.css']
})


export class GererPanneTechComponent implements  OnInit{

  public formFilterPanne! : FormGroup;
  public formSetConstat! : FormGroup;
  public panneDtoTech!:PanneDTO_Tech;
  public panneDepInfo!:PanneDTO_Dep;
  public panneDepMath!:PanneDTO_Dep;
  public showPannesFiltred!: PanneDTO_Dep;
  public panneConstat!:any;

  constructor(private fb : FormBuilder, private besoinService:BesoinService) {
    this.formFilterPanne = this.fb.group({
      byDepart:this.fb.control("Informatique"),
      byStatus : this.fb.control("Panne"),
    });

    this.formSetConstat = this.fb.group({
      constat:this.fb.control("Date : 9 mai 2023\n" +
        "Rapport de panne : Imprimante HP LaserJet Pro MFP M477fdw\n" +
        "\n" +
        "Description de la panne : L'imprimante ne fonctionne plus et affiche un message d'erreur \"51.10 Erreur\". Après avoir effectué des tests de diagnostic, il a été constaté que le problème vient de la carte de contrôle de la ressource.")
    });


    this.showPannesFiltred = {
      pannes:[],
      departementName:''
    }

  }

  ngOnInit(): void {


    this.panneDtoTech ={
      panneDTODeps : []
    }
    this.handleGetAllPanneTech()

    // console.log("hil hil : ",this.panneDtoTech)
    // if(this.panneDtoTech) {
    //   this.panneDepInfo = this.panneDtoTech.panneDTODeps.filter(dep => dep.departementName == "Informatique")[0]
    //   this.panneDepMath = this.panneDtoTech.panneDTODeps.filter(dep => dep.departementName == "Mathematique")[0]
    //
    // }

    this.handleShowPanneByDep()

  }


  handleGetAllPanneTech(){
    this.besoinService.getAllPannesTechnicien().subscribe(
      {
        next : (data)=>{
            this.panneDtoTech = data;

          this.panneDepInfo = this.panneDtoTech.panneDTODeps.filter(dep => dep.departementName == "Informatique")[0]
          this.panneDepMath = this.panneDtoTech.panneDTODeps.filter(dep => dep.departementName == "Mathematique")[0]
          console.log("inf : ",this.panneDepInfo)
          console.log("math : ",this.panneDepMath)
          this.handleShowPanneByDep()

          console.log("hole hole : ",this.panneDtoTech)
        },
        error : (err)=>{

        }
      });
  }


  handleShowPanneByDep() {
    let depart = this.formFilterPanne.get('byDepart')!.value
      if (depart) {
        if (depart == "Informatique") {

          if(this.panneDepInfo ) {

            this.showPannesFiltred.pannes = this.panneDepInfo.pannes
            this.showPannesFiltred.departementName = this.panneDepInfo.departementName
          }

        } else if (depart == "Mathematique") {
          if(this.panneDepMath ) {

            this.showPannesFiltred.pannes = this.panneDepMath.pannes
            this.showPannesFiltred.departementName = this.panneDepMath.departementName
          }
        }
      }
      let status = this.formFilterPanne.get('byStatus')!.value
      if (status == "Panne") {
        this.showPannesFiltred.pannes = this.showPannesFiltred.pannes.filter(p => p.isThreated == false);

      } else if (status == "Traitée") {
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
    this.besoinService.setEtat(panne.idPanne).subscribe(
      {
        next : (data)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Modification Avec Success',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error : (err)=>{

        }
      });

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

  handleSetConstat(panneConstat: any) {


    let panneDTOConstat : PanneDTO_Constat={
      idPanne : panneConstat.idPanne,
      constat : this.formSetConstat.get('constat')?.value
    }

    console.log("Constat : ",panneDTOConstat)

    this.besoinService.setConstat(panneDTOConstat).subscribe(
      {
        next : (data)=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Modification Avec Success',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error : (err)=>{
          console.log(err)
        }
      });
  }
}
