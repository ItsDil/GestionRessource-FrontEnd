import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Imprimante, Ordinateur, Ressource} from "../../model/Ressource";
import flatpickr from 'flatpickr';
import {BesoinService} from "../../services/besoin.service";
import {Added_Besoin} from "../../model/Besoin";
import {LoginService} from "../../services/login.service";
import Swal from "sweetalert2";
// import 'flatpickr/dist/flatpickr.min.css'
@Component({
  selector: 'app-besoins',
  templateUrl: './besoins.component.html',
  styleUrls: ['./besoins.component.css'],

})
export class BesoinsComponent implements OnInit{
  @ViewChild('flatpickrInput') flatpickrInput!: ElementRef;

  public addBesoinForm! : FormGroup;
  public ressources:any[]=[];
  public idMember! : number;

  constructor(private fb : FormBuilder, private besoinService : BesoinService, private loginService : LoginService) {
  }
  ngOnInit(): void {

    this.addBesoinForm = this.fb.group({
      dateAjout:this.fb.control(null),
      typeRessource : this.fb.control(null),
      vitesse : this.fb.control(null),
      resolution:this.fb.control(null),
      cpu:this.fb.control(null),
      ram:this.fb.control(null),
      ecran:this.fb.control(null),
      stockage:this.fb.control(null)
    });
    this.addBesoinForm.reset()


    this.idMember = this.loginService.getIdMemeber();
    console.log("idMemeber : ",this.idMember)



  }

  ngAfterViewInit() {
    flatpickr(this.flatpickrInput.nativeElement);
  }




  handleAddBesoinToLst() {
    let typeRessource=this.addBesoinForm.get('typeRessource')!.value;
    if(typeRessource=='Imprimante')
    {
      let imprimant:Imprimante={
        id:-1,
        dateAjout:this.addBesoinForm.get('dateAjout')!.value,
        vitesse:this.addBesoinForm.get('vitesse')!.value,
        resolution:this.addBesoinForm.get('resolution')!.value
      };
      if(this.ressources) {
        this.ressources.push(imprimant)
      }
    }
    if(typeRessource=='Ordinateur')
    {
      let ordinateur:Ordinateur={
        id:-1,
        dateAjout:this.addBesoinForm.get('dateAjout')!.value,
        cpu:this.addBesoinForm.get('cpu')!.value,
        stockage:this.addBesoinForm.get('stockage')!.value,
        ecran:this.addBesoinForm.get('ecran')!.value,
        ram:this.addBesoinForm.get('ram')!.value
      };
      if(this.ressources) {
        this.ressources.push(ordinateur)
        console.log("from ord : " + this.ressources)
      }
    }
    this.CustomresetInput();
  }

  CustomresetInput(){
    this.addBesoinForm.get('dateAjout')!.reset();
    this.addBesoinForm.get('cpu')!.reset();
    this.addBesoinForm.get('stockage')!.reset();
    this.addBesoinForm.get('ecran')!.reset();
    this.addBesoinForm.get('ram')!.reset();
    this.addBesoinForm.get('vitesse')!.reset();
    this.addBesoinForm.get('resolution')!.reset();
  }
  isValideInpImp() {

    let typeRessource = this.addBesoinForm.get('typeRessource')!.value;

    if (typeRessource=="Imprimante") {
      if (this.addBesoinForm.get('dateAjout')!.value != null && this.addBesoinForm.get('vitesse')!.value != null && this.addBesoinForm.get('resolution')!.value != null) {
        return true;
      }
      return false
    }else {
      if (this.addBesoinForm.get('dateAjout')!.value != null
        && this.addBesoinForm.get('stockage')!.value != null
        && this.addBesoinForm.get('cpu')!.value != null
        && this.addBesoinForm.get('ecran')!.value != null
        && this.addBesoinForm.get('ram')!.value != null) {
        return true;
      }
      return false

    }
  }


  handleSaveBesoin() {

    let Ordinateurs :Ordinateur[]=[];
    let Imprimantes :Imprimante[]=[];

    for(let ress of this.ressources){
        if(ress.vitesse){
        Imprimantes.push(ress);
      }
      else{
        Ordinateurs.push(ress);
      }
    }

    let besion : Added_Besoin ={
      idMembreDepartement : this.idMember,
      ordinateurs:Ordinateurs,
      imprimantes:Imprimantes
    }

    console.log("besoina : ",besion)
    this.ressources=[]
    this.besoinService.addBesoin(besion).subscribe({
      next : (data)=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ajout Avec Success',
          showConfirmButton: false,
          timer: 1500
        })

       this.ressources=[]
      },error : (err) => {

      }
    });
  }
}
