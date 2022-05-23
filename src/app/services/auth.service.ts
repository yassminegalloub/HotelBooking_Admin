import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:8080/api/auth/';
const API_URL = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  isLogged= false;
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  roleAs:string[];
  data;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  

isLoggedIn(){
  const loggedIn= sessionStorage.getItem("auth-token")
  if(loggedIn != " "){
    this.isLogged= true;
  }
  else{
    this.isLogged= false; 
  }
 
  return this.isLogged;
}

getCurrentRole(){
  this.roleAs=this.tokenStorage.getUser().roles ;
return this.roleAs;
}

getPublicContent(): Observable<any> {
  return this.http.get(API_URL + 'all', { responseType: 'text' });
}

getUserBoard(): Observable<any> {
  return this.http.get(API_URL + 'user', { responseType: 'text' });
}



getAdminBoard(): Observable<any> {
  return this.http.get(API_URL + 'admin', { responseType: 'text' });
}

}


