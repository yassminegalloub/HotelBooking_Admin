import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:8080/api/auth/';

const API_URL = 'http://localhost:8080/api/test/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/auth';
  isLogged= false;
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  roleAs:string[];
  data;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


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
  
    createUser(User: Object): Observable<Object> {
      return this.http.post(`${this.baseUrl}/newUser/`, User);
    }
  
    getUser(): Observable<any> {
      return this.http.get(AUTH_API + 'allUsers')
    }
    //method pour recupére tous les roles
    getRole(): Observable<any> {
      return this.http.get(AUTH_API + 'allRoles')
    }
  
  
    deleteUser(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/DeleteUser/${id}`, { responseType: 'text' });
    }
    detailsUser(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/details/${id}`);
    }
  
    updateUser(id: number, value: any): Observable<Object> {
      return this.http.post(`${this.baseUrl}/editUser/${id}`, value);
    }
}
