import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import { AlertifyService } from 'src/app/Services/alertify.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm!:FormGroup;
  isSubmitted:boolean = false; 
  constructor(private account:AccountService,fb:FormBuilder,private alertify:AlertifyService){
   this.forgotForm = fb.group({
     email:['',[Validators.required,Validators.email]],
   })
 }



get fc(){
  return this.forgotForm.controls;
}

submit(){
  this.isSubmitted = true;
  if(!this.forgotForm.valid) return;

  const fv = this.forgotForm.value;
  

  this.account.forgotPassword(fv.email).subscribe(()=>{
    this.alertify.success('check your email')
  })
}
}
