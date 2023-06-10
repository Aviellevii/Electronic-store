import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent{
  loggedinUser!:string;
  numProd!:number;
  constructor(private account:AccountService,private alertify:AlertifyService,private router:Router){
    account.userObservable.subscribe((user)=>{
      this.loggedinUser = user.firstname + ' ' + user.lastname;
    })
   
  }
  
  loggedin(){
    if(!this.account.CurrentUser.token) 
      return false;
    return true;
  }
  //check if user is admin
  get isAdmin(){
    if(this.account.CurrentUser.role !== 'admin')
     return false;
    return true;
  }
  logout(){
    this.account.logout();
    this.alertify.success('yoo logged out');
    this.router.navigateByUrl('/');
  }
}
