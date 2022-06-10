import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { User } from 'src/app/_models/User';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  heading = 'Mon Profile';
  subheading = '';
  icon = 'pe-7s-user icon-gradient bg-sunny-morning';
  isLoggedIn = false;
  showAdminBoard = false;
  showReceptionBoard = false;
  private roles: string[];

  id: number;
  user: User;
  user1: User;
  registerFormUser: FormGroup;
  submitted = false;
  modalRef: any;
  currentUser: User;
  formBuilder: any;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private modalService: BsModalService,
    private token: TokenStorageService) { 
      //   this.registerFormUser = this.formBuilder.group({
      
      //    password: [null, Validators.required, ],
      //     newpassword: [null, Validators.required, ],
      //    confirmpassword: [null, Validators.required, ]
      //  },
      //  {
      //  Validators: this.MustMatch("password", "confirmpassword" )
      //  }
      //  )

    }

  //   get u() { return this.registerFormUser.controls }
  //    MustMatch(controlName: string, matchingControlName: string){
  //   return(formGroup: FormGroup)=>{
  //     const control= formGroup.controls[controlName];
  //     const matchingControl= formGroup.controls[matchingControlName];
  //     if(matchingControl.errors && !matchingControl.errors.MustMatch){
  //       return 
  //     }
  //     if(control.value !== matchingControl.value){
  //       matchingControl.setErrors({MustMatch:true});
  //     }
  //     else{
  //       matchingControl.setErrors(null);
  //     }
  //   }

  // }
  ngOnInit() {
    this.currentUser = this.token.getUser();
console.log(this.currentUser.id);
    this.user= new User();
    this.id= this.currentUser.id;
    this.userService.detailsUser(this.id).subscribe(data=>{
      console.log(data)
      this.user= data;
    }, error => console.log(error));
   
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showReceptionBoard = this.roles.includes('ROLE_RECEPTION');

  
  }
  updateUser() {
    this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(data =>{
      console.log(data);
    }, error =>console.log(error));
    window.location.reload();

  }
  
  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template, {
       animated: true,
       backdrop: 'static',
     });
     this.submitted = false;
   }
 
  reloadPage(): void {
    window.location.reload();
  }

  onReset() {
    this.submitted = false;
    this.registerFormUser.reset();
    this.modalRef.hide()
  }
  ChangePassword(){
   this.userService.updatePassword(this.id, this.user1).subscribe(data =>{
    console.log(data);
    this.user1 = new User();
  }, error =>console.log(error));

  }
}
