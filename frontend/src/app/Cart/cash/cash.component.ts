import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { OrderService } from 'src/app/Services/order.service';
declare var paypal:any;


@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  order!:any;
  cartList!:any;
  constructor(private orderService:OrderService,private cartService:CartService){
    this.getOrders();
    this.getCarts();
  }
//get cart details
  getCarts(){
    this. cartService.getCart().subscribe((cart)=>{
      this.cartList = cart;
    })
  }
  //get order details
  getOrders(){
    this.orderService.getOrder().subscribe((order:any)=>{
      this.order = order;
    })
  }
}
