import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {
  username: string;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showReceptionBoard = false;
  constructor(public globals: ThemeOptions, private tokenStorageService: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showReceptionBoard = this.roles.includes('ROLE_RECEPTION');
    this.username = user.username;
  }
}
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
