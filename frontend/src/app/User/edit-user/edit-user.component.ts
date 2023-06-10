import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.class';
import { AccountService } from 'src/app/Services/account.service';
import { AlertifyService } from 'src/app/Services/alertify.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{
  user!:User;
  id!:string;
  editUser!:FormGroup;
  isSubmitted:boolean = false;
  constructor(private account:AccountService,private route:ActivatedRoute,private fb:FormBuilder,private router:Router,private alertify:AlertifyService){
 
  }
  ngOnInit(): void {
    //get user id from url
    this.route.params.subscribe((param)=>{
      this.id = param.id;
    })
    //get user details by id and put in form
    this.account.getUser(this.id).subscribe((user)=>{
      this.user = user
      this.editUser = this.fb.group({
        firstname:[this.user.firstname,Validators.required],
        lastname:[this.user.lastname,Validators.required],
        email:[this.user.email,[Validators.required,Validators.email]],
        mobile:[this.user.mobile,[Validators.required,Validators.minLength(9)]],
        role:[this.user.role,Validators.required],
        isBlocked:[this.user.isBlocked,Validators.required],
      })
    })
   
  }

  get fc(){
    return this.editUser.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(!this.editUser.valid) return;

    //get from value
    const fv = this.editUser.value;

    const user:any = {
      firstname:fv.firstname,
      lastname:fv.lastname,
      email:fv.email,
      mobile:fv.mobile,
      role:fv.role,
      isBlocked:fv.isBlocked
    }

    this.account.updateUser(this.id,user).subscribe(()=>{
      this.alertify.success('user updated');
      this.router.navigateByUrl('/users');
    })
  }
}
