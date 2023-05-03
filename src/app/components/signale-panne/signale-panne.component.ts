import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signale-panne',
  templateUrl: './signale-panne.component.html',
  styleUrls: ['./signale-panne.component.css']
})
export class SignalePanneComponent implements OnInit{
  @ViewChild('zoomupModal_ShowRess') zoomupModal_ShowRess!: NgbModalRef;
  ressources:any[]=[];
  ress:any ;

  constructor() {
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

    let status  = ress.status;
    if (status == "Panne")
      ress.status = "Good";
    else
      ress.status = "Panne";
  /*

  *     let promo = p.promotion;
    this.productService.SetPromotion(p.id).subscribe(
      {
        next : (data)=>{
          p.promotion = !promo;
          // console.log(this.products)
        },
        error : (err)=>{
          this.errorMessage = err;
        }
      });*/


  }
}
