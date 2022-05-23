import { UserService } from './../../services/user.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Role';
// import { UserSvService } from '../_services/user-sv.service';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.sass']
})
export class GestionUserComponent implements OnInit {
  users: Observable<User[]>;
  roles: Observable<Role[]>;

  user: User= new User();
  registerFormUser: FormGroup;
  submitted = false;
  modalRef: any;
  filterString = "";
  filtered;
  p;
  dataSource: any;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder,private userService: UserService, private router: Router ) {
    this.registerFormUser = this.formBuilder.group({
      name: [null, Validators.required], 
      username: [null, Validators.required],
      email: [null, Validators.required,],
      password: [null, Validators.required, ],
    })
  }

  ngOnInit() {
    this.reloadData();
    this.roles= this.userService.getRole();
  }

  reloadData() {
    this.users= this.userService.getUser();

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
  onSubmit(){
    this.submitted = true;
    this.save();   
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
