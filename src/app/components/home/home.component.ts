import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, Renderer2} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {myapp} from '../../../assets/layouts/semi-dark-menu/app.js';
import {UserStoreService} from "../../services/user-store.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public users:any = [];
  public firstName :string="";
  public role!: string;

  constructor(private loginService : LoginService, private userStore: UserStoreService) {}

  ngOnInit(): void {
    this.loginService.getUsers().subscribe({
      next : (data)=>{
        this.users=data;
      },error : (err) => {

      }
    });


    this.userStore.getFirstNameFromStore().subscribe(
      value => {
        let firstNameFromToken = this.loginService.getFirstNameFromToken();
        this.firstName = value || firstNameFromToken;
      }
    );

    this.userStore.getRoleFromStore().subscribe(value => {
      const roleFromToken = this.loginService.getRoleFromToken();
      this.role = value || roleFromToken;
    });


  }

  logout(){
    this.loginService.signOut();
  }





}
