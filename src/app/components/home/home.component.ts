import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, Renderer2} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {myapp} from '../../../assets/layouts/semi-dark-menu/app.js';
import {UserStoreService} from "../../services/user-store.service";
import {NavigationEnd, Router} from "@angular/router";
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

  constructor(private loginService : LoginService, private userStore: UserStoreService, private router:Router) {

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

  }


  logout(){
    this.loginService.signOut();
  }


  handleToMemebers() {
    this.currentUrl="/gestionMembers";
  }
}
