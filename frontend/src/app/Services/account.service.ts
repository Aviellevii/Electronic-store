import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { login } from '../models/login.interface';
import { RegisterInterface } from '../models/register.interface';
import { User } from '../models/user.class';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject = new BehaviorSubject<User>(this.getuserfromlocalstorage());
  private readonly baseUrl;
  public userObservable:Observable<User>;
  constructor(private http:HttpClient,private alertify:AlertifyService) { 
    this.baseUrl = 'http://localhost:3000/api/user';
    this.userObservable = this.userSubject.asObservable();
  }

  //get currnet user
  public get CurrentUser():User{
    return this.userSubject.value;
  }

  Login(userlogin:login):Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/login`,userlogin).pipe(
      tap({
        next:(user) => {
          this.setUserTolocalStorage(user);
          this.userSubject.next(user);
          this.alertify.success('the login succeess')
        },error:(errorResponse)=>{
          this.alertify.error(errorResponse.error)
        }
      })
    )
  }
  Register(userRegister:RegisterInterface):Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/register`,userRegister).pipe(
      tap({
        next:(user) => {
          this.setUserTolocalStorage(user);
          this.userSubject.next(user);
          this.alertify.success('Your details saved please log in')
        },error:(errorResponse)=>{
          this.alertify.error(errorResponse.error)
        }
      })
    )
  }

  forgotPassword(email:string){
    return this.http.post(`${this.baseUrl}/forgot-pass`,{email});
  }
  resetPassword(id:string,token:string,password:string){
    return this.http.put(`${this.baseUrl}/reset-password/${id}/${token}`,{password});
  }
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}`);
  }
  getUser(id:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
  updateUser(id:string,user:User):Observable<User>{
    return this.http.patch<User>(`${this.baseUrl}/${id}`,user);
  }
  deleteUser(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  logout(){
    this.userSubject.next(new User());
     localStorage.removeItem('User');
     window.location.reload();
   }
  //set user details to local storage
  private setUserTolocalStorage(user:User){
    localStorage.setItem('User',JSON.stringify(user));
  }

 //get user details from local storage
  private getuserfromlocalstorage():User{
    const userJson = localStorage.getItem('User');
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

}
