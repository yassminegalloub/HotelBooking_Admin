import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {
  isLoggedIn: Boolean;
   roles: string[];
  constructor (private authService: AuthService, private tokenStorage: TokenStorageService,
    private router : Router) {} 
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkUserLogin(next, url);
  
}
checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
  if (this.authService.isLoggedIn()) {
    const userRole = this.authService.getCurrentRole();
    if (route.data.role && route.data.role.indexOf(userRole) === -1) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
      
 
  this.router.navigate(['/home']);
    return false;

}

}