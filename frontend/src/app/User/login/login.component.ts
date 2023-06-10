import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/app/models/login.interface';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!:FormGroup;
  isSubmitted:boolean = false; 
  constructor(private account:AccountService,fb:FormBuilder,private router:Router){
    this.loginForm = fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }
  
  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(!this.loginForm.valid) return;

    const fv = this.loginForm.value;

    const user:login = {
      email:fv.email,
      password:fv.password,
    }

    this.account.Login(user).subscribe(()=>{
      this.router.navigateByUrl('/');
    })
  }
}
