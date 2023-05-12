import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {UserStoreService} from "../../services/user-store.service";
import {NavigationEnd, Router} from "@angular/router";
import {Message, TYPE_MSG} from "../../model/Message";
import {CanalMessagrieService} from "../../services/canal-messagrie.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public users:any = [];
  public firstName :string="";
  public role!: string|void ;
  public currentUrl!:any;
  public messages:Message[]=[];
  private roles: any[]=[]
  constructor(private loginService : LoginService, private userStore: UserStoreService, private router:Router, private canalMessagerieService: CanalMessagrieService) {

  }

  ngOnInit(): void {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log('Current URL:', this.currentUrl);
      }
    });


    this.userStore.getFirstNameFromStore().subscribe(
      value => {
        let firstNameFromToken = this.loginService.getFirstNameFromToken();
        this.firstName = value || firstNameFromToken;
      }
    );

    this.userStore.getRoleFromStore().subscribe(value => {
      let roleFromToken  = this.loginService.getRoleFromToken();
      this.role = value || roleFromToken;
    });

    // location.reload();
    const reloadAfterRedirect = sessionStorage.getItem('reloadAfterRedirect');
    if (reloadAfterRedirect === 'true') {
      sessionStorage.removeItem('reloadAfterRedirect');
      window.location.replace(window.location.href);
    }

    this.userStore.getRoles().subscribe(value => {
      let roles = this.loginService.getRoles();
      this.roles =value || roles;
    })


    this.handleShowMessagerie();

  }


  logout(){
    this.loginService.signOut();
  }


  handleToMemebers() {
    this.currentUrl="/gestionMembers";
  }

  handleNotifyAllEns() {

    let idChefDep:number = this.loginService.getIdMemeber();
    let DepartName:string = this.loginService.getDepartMemeber();
    let sender:any= {
      id:idChefDep,
      email:"",
      firstname:"",
      lastname:"",
      roles:[],
      password:"",
      departement:DepartName
    }

    let message : Message = {
      id:-1,
      idAppelOffre:-1,
      typeMsg:"ONE_TO_DEP",
      message:"N'oubliez pas de nous faire part de vos besoins.",
      dest: sender,
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



  handleShowMessagerie() {

    let idSender: number = this.loginService.getIdMemeber();

    this.canalMessagerieService.getMssgByDepart(idSender).subscribe({
      next: (data) => {

        this.messages = data;
      }, error: (err) => {
        console.log(err)
      }
    });
  }

}
