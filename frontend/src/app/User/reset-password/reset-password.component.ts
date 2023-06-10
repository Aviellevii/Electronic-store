import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { AlertifyService } from 'src/app/Services/alertify.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm!:FormGroup;
  isSubmitted:boolean = false; 
  id!:string;
  token!:string;
  constructor(private account:AccountService,fb:FormBuilder,private router:Router,private route:ActivatedRoute,private alertify:AlertifyService){
    this.resetForm = fb.group({
      password:['',[Validators.required]],
    })
    this.route.params.subscribe((params)=>{
      this.id = params.id;
      this.token = params.token;
    })
    console.log(this.id + " " + this.token)
  }
  get fc(){
    return this.resetForm.controls;
  }
  
  submit(){
    this.isSubmitted = true;
    if(!this.resetForm.valid) return;
  
    const fv = this.resetForm.value;
    
  
    this.account.resetPassword(this.id,this.token,fv.password).subscribe(()=>{
      this.alertify.success('please login with your new password again')
      this.router.navigateByUrl('/login');
    })
  }
}
