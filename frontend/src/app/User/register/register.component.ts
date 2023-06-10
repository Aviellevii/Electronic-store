import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterInterface } from 'src/app/models/register.interface';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!:FormGroup;
  isSubmitted:boolean = false; 
  constructor(private account:AccountService,fb:FormBuilder,private router:Router){
    this.registerForm = fb.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(10)]],
      mobile:['',[Validators.required,Validators.minLength(9)]],
    })
  } 
  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(!this.registerForm.valid) return;

    const fv = this.registerForm.value;

    const user:RegisterInterface = {
      firstname:fv.firstname,
      lastname:fv.lastname,
      email:fv.email,
      password:fv.password,
      mobile:fv.mobile
    }

    this.account.Register(user).subscribe(()=>{
      this.router.navigateByUrl('/');
    })
  }
}
