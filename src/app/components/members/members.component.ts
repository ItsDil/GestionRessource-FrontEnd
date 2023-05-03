import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MembersDepartService} from "../../services/members-depart.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Fournisseur} from "../../model/Fournisseur";
import {MemberDepart} from "../../model/MemberDepart";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
declare var $:any;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{


  public users:any = [];
  // public rownodes!:rowNode[];
  public addMemberForm!: FormGroup;
  public editMemberForm!: FormGroup;

  public editedMemeber:MemberDepart = {
        id: -1,
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        departement: "",
        roles: []
      };

  @ViewChild('mySelect') mySelectRef!: ElementRef<HTMLSelectElement>;

  constructor(private memberDep : MembersDepartService, private fb : FormBuilder, private router: Router) {
  }


  ngOnInit(): void {
    this.handleGetAllUsers();

    this.addMemberForm = this.fb.group({
      firstname : this.fb.control(null,[Validators.required]),
      lastname : this.fb.control(null,[Validators.required]),
      email : this.fb.control(null,[Validators.required]),
      password : this.fb.control(null,[Validators.required]),
      roles : this.fb.control(null,[Validators.required]),
      departement : this.fb.control(null,[Validators.required])
    });

    this.editMemberForm = this.fb.group({
      id:this.fb.control(null),
      firstname : this.fb.control(null,[Validators.required]),
      lastname : this.fb.control(null,[Validators.required]),
      email : this.fb.control(null,[Validators.required]),
      password : this.fb.control(null,[Validators.required]),
      roles : this.fb.control(null,[Validators.required]),
      departement : this.fb.control(null,[Validators.required])
    });

    this.editedMemeber = {
      id: -1,
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      departement: "",
      roles: []
    }
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      $(document).ready(function () {
        $('#style-3').DataTable();

      });
    },500);

  }

  handleGetAllUsers(){
    this.memberDep.getUsers().subscribe({
      next : (data)=>{
        console.log("users :"+data)
        this.users=data;
      },error : (err) => {

      }
    });
  }

  handleAddMemberDepar(){
      console.log(this.addMemberForm.value);



    let user:MemberDepart;


    user= {
      id: null,
      firstname:this.addMemberForm.get("firstname")?.value,
      lastname:this.addMemberForm.get("lastname")?.value,
      password:this.addMemberForm.get("password")?.value,
      email:this.addMemberForm.get("email")?.value,
      roles:[{roleID:-1,rolename:this.addMemberForm.get("roles")?.value}],
      departement:this.addMemberForm.get("departement")?.value
  }

    // console.log(this.rownodes);

    this.memberDep.addMember(user).subscribe({
      next : (data)=>{
           this.users.push(user);
        setTimeout(() => {
          const table = $('#style-3').DataTable();

          // table.draw(false);
          // Ajouter une nouvelle ligne à la table
          const rowNode = table.row.add([
            "<td class='checkbox-column text-center' >"+this.users.length+"</td>",
            "<td>"+user.firstname+"</td>",
            "<td>"+user.lastname+"</td>",
            "<td>"+user.email+"</td>",
            " <td class=''><span class='shadow-none badge badge-primary'>"+user.roles[0].rolename+"</span></td>",
            " <td class=''>" +
            "                <ul class='table-controls'>" +
            "                  <li>" +
            "                    <a class='bs-tooltip'" +
            "                         data-bs-toggle='tooltip' data-bs-placement='top'" +
            "                         title='Please Refresh The page !! ' data-original-title='Edit'>" +
            "                      <svg xmlns='http://www.w3.org/2000/svg' width='24'" +
            "                          height='24' viewBox='0 0 24 24' fill='none'" +
            "                          stroke='currentColor' stroke-width='2'" +
            "                          stroke-linecap='round' stroke-linejoin='round'" +
            "                          class='feather feather-edit-2 p-1 br-8 mb-1'>" +
            "                          <path d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3'></path>" +
            "                      </svg>" +
            "                    </a>" +
            "                  </li>" +
            "                  <li>" +
            "                    <a href='javascript:void(0);' class='bs-tooltip'" +
            "                         data-bs-toggle='tooltip' data-bs-placement='top'" +
            "                         title='Delete' data-original-title='Delete'>" +
            "                      <svg xmlns='http://www.w3.org/2000/svg' width='24'" +
            "                        height='24' viewBox='0 0 24 24' fill='none'" +
            "                        stroke='currentColor' stroke-width='2'" +
            "                        stroke-linecap='round' stroke-linejoin='round'" +
            "                        class='feather feather-trash p-1 br-8 mb-1'>" +
            "                        <polyline points='3 6 5 6 21 6'></polyline>'" +
            "                        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>" +
            "                      </svg>" +
            "                    </a>" +
            "                  </li>" +
            "                </ul>" +
            "              </td>"

          ]).draw(false);


          // if(this.rownodes)
          //   this.rownodes.push({
          //     row : rowNode,
          //     id:user.id
          //   });

        },200);



      },
      error: (err)=>{
        console.log("err addMemeber : "+err)
      }
    });



  }

  handleDeleteMemeber(id : number) {

    this.memberDep.deleteMemeber(id).subscribe({
      next : (data)=>{


        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {

            // if(this.rownodes){
            //   let rownode = this.rownodes.find(n=>n.id==id);
            //   console.log(rownode)
            //
            // }

            this.handleGetAllUsers();

            const table = $('#style-3').DataTable();



            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })


      },error : (err)=>{

      }
    });


  }

  handlShowEditModal(user: any) {

    const container = document.getElementById("openModelEditMember");
    const button  = document.createElement('button');
    button.type ="button";
    button.style.display = "none";
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target','#zoomupModal_EditMember');


    if(container) {
      container.appendChild(button);

      const mySelect = document.getElementById('mySelect') as HTMLSelectElement;
      // this.editedMemeber = user;

      this.editMemberForm.setValue({
        id:user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        roles: user.roles[0].rolename,
        departement: user.departement
      });



      setTimeout(() => {
        if(this.mySelectRef) {
          this.mySelectRef.nativeElement.value = user.roles[0].rolename;
        }
      }, 0);
    }
    button.click();




  }

  handleEditMember( ) {

    this.editedMemeber= {
      id: this.editMemberForm.get("id")?.value,
      firstname:this.editMemberForm.get("firstname")?.value,
      lastname:this.editMemberForm.get("lastname")?.value,
      password:this.editMemberForm.get("password")?.value,
      email:this.editMemberForm.get("email")?.value,
      roles:[{roleID:5,rolename:this.editMemberForm.get("roles")?.value}],
      departement:this.editMemberForm.get("departement")?.value
    }
    console.log(this.editedMemeber)

    this.memberDep.editMember(this.editMemberForm.get("id")?.value,this.editedMemeber).subscribe({
      next: (data)=>{
        this.handleGetAllUsers();
      },
      error:(err)=>{

      }
    });

}

}
