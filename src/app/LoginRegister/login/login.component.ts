import { TokenStorageService } from './../../services/token-storage.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form: any = {};
  registerFormUser: FormGroup;
  submitted = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private formBuilder: FormBuilder,private authService: AuthService, private tokenStorage:TokenStorageService,
    private router: Router) { 
      this.registerFormUser = this.formBuilder.group({
        username: [null, Validators.required],
        password: [null, Validators.required]
      })
    }

  ngOnInit():void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  get u() { return this.registerFormUser.controls }

  onSubmit(): void {
    this.submitted = true;

    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
       // this.reloadPage();
       if(this.tokenStorage.getUser().roles=="ROLE_ADMIN"  ){
        this.router.navigate(['gestionUser']);
       }else if(this.tokenStorage.getUser().roles=="ROLE_RECEPTION"  )
       {
        this.router.navigate(['register']);
       }
      else 
      this.router.navigate(['home']);
   
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    if (this.registerFormUser.invalid) {
      return;
  }
  
  }

  reloadPage(): void {
    window.location.reload();
  }

}
