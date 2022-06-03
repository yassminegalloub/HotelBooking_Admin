import { UserService } from '../../_services/user.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/User';
import { Router } from '@angular/router';
import { Role } from 'src/app/_models/Role';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
// import { UserSvService } from '../_services/user-sv.service';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.sass']
})
export class GestionUserComponent implements OnInit {
  showAdminBoard = false;
  showReceptionBoard = false;
  isLoggedIn = false;
  users: Observable<User[]>;
  Roles:Role[];
  private roles: string[];

  user: User= new User();
  registerFormUser: FormGroup;
  submitted = false;
  modalRef: any;
  filterString = "";
  filtered;
  p: number = 1;
  dataSource: any;
  heading = 'Liste des Clients';
  subheading = '';
  icon = 'pe-7s-user icon-gradient bg-sunny-morning';
  constructor(private modalService: BsModalService, private formBuilder: FormBuilder,private userService: UserService, private router: Router
    , private tokenStorageService: TokenStorageService ) {
    this.registerFormUser = this.formBuilder.group({
      name: [null, Validators.required], 
      username: [null, Validators.required],
      email: [null, Validators.required,],
      password: [null, Validators.required, ],
    })
  }

  ngOnInit() {
  
    this.reloadData();
  //  this.roles= this.userService.getRole();
    this.userService.getRole().subscribe(res =>{this.Roles= res})
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showReceptionBoard = this.roles.includes('ROLE_RECEPTION');
    }


  }

  reloadData() {
    this.users= this.userService.getUser();

  }
  changeRole(e: any) {
  //  this.role= e.target.value, 
   // console.log(this.role);
  }

 
  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
      
  }

  detailsUser(id: number){
    this.router.navigate(['details', id]);
  }

  updateUser(id: number){
    this.router.navigate(['updateUser', id]);
  }



  get u() { return this.registerFormUser.controls }
  save() {
    this.userService
    .createUser(this.user).subscribe(data => {
      console.log(data)
      this.user = new User();
     
    }, 
    error => console.log(error));
  }

  saveReception() {
    this.userService
    .createReception(this.user).subscribe(data => {
      console.log(data)
      this.user = new User();
     
    }, 
    error => console.log(error));
  }
  onSubmit(){
    this.submitted = true;
    this.save();   
    this.reloadData();

    // stop here if form is invalid
    if (this.registerFormUser.invalid) {
        return;
    }
  }

 
  onReset() {
    this.submitted = false;
    this.registerFormUser.reset();
    this.modalRef.hide()
  }

  openModal(template: TemplateRef<any>) {

   this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static',
    });
    this.submitted = false;
  }

  isMatch(item) {
    if (item instanceof Object) {
      console.log("item",item)
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item.toString().indexOf(this.filterString) > -1
    }
  }

  onFilterChange() {
     this.userService.getUser().subscribe((dataUser) => {
       this.users = dataUser
       this.filtered = this.users.filter((invoice) => this.isMatch(invoice));
       console.log(this.filtered)
        //this.dataSource = new MatTableDataSource(response);
     }, (error: any) => {})
  }


}
