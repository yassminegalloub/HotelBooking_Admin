import {Component, OnInit} from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  constructor(public globals: ThemeOptions, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
