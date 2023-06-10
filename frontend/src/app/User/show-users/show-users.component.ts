import { Component } from '@angular/core';
import { User } from 'src/app/models/user.class';
import { AccountService } from 'src/app/Services/account.service';
import { AlertifyService } from 'src/app/Services/alertify.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent{
  users!:Array<User>
  constructor(private account:AccountService,private alertify:AlertifyService){
    account.getAllUsers().subscribe((users:Array<User>)=>{
      this.users = users; 
    })
  }

  delete(id:string){
    this.account.deleteUser(id).subscribe(_ => {
      this.alertify.success('user is deleted')
      this.users = this.users.filter(user=>user._id != id);
    })
  }
}
