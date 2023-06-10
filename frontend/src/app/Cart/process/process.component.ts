import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';
import { User } from 'src/app/models/user.class';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent {
  cartList!:any;
  total:number =0;
  OrderForm!:FormGroup;

  constructor(private cartService:CartService,fb:FormBuilder,account:AccountService,private orderService:OrderService,private router:Router){
    this.getCart();
    //get user details and put in form constrol
    account.userObservable.subscribe((user:User)=>{
      this.OrderForm = fb.group({
        firstname:[user.firstname,[Validators.required]],
        lastname:[user.lastname,[Validators.required]],
        email:[user.email,[Validators.required]],
        mobile:[user.mobile,[Validators.required]],
        address:['',[Validators.required]],
      })
    })
   }
   //get user cart
  getCart(){
    this.cartService.getCart().subscribe((cart:any)=>{
      this.cartList = cart;
      this.finishPrice(cart);
    })
  }

  finishPrice(cart:any){
    this.total = 0;
    for(let i = 0; i< cart.length;i++){
      this.total += cart[i].total;
    }
    return this.total;
  }
  //create order
  createOrder(){
    if(!this.OrderForm.valid) return;
    //get value from form control
    const fv = this.OrderForm.value;
    const order = {
      cart:this.cartList,
      address:fv.address,
      fullname:fv.firstname + ' ' + fv.lastname,
      email:fv.email,
      phone:fv.mobile,
      total:this.total
    }
    this.orderService.createOrder(order).subscribe((order)=>{
      this.router.navigateByUrl('/cash');
    })
  }
}
