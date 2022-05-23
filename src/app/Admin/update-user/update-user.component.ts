import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.sass']
})
export class UpdateUserComponent implements OnInit {
  id: number;
  user: User;
  registerFormUser: FormGroup;
  submitted = false;
  modalRef: any;
  constructor(
       private route: ActivatedRoute,
       private router: Router,
       private userService: UserService) { }

  ngOnInit() {
    this.user= new User();
    this.id= this.route.snapshot.params['id'];
    this.userService.detailsUser(this.id).subscribe(data=>{
      console.log(data)
      this.user= data;
    }, error => console.log(error));
  }

  updateUser() {
    this.userService.updateUser(this.id, this.user).subscribe(data =>{
      console.log(data);
      this.user = new User();
    }, error =>console.log(error));
  }
  onSubmit() {
    this.updateUser();  
    this.reloadPage();  
  }
  reloadPage(): void {
    window.location.reload();
  }

  onReset() {
    this.submitted = false;
    this.registerFormUser.reset();
    this.modalRef.hide()
  }
}
