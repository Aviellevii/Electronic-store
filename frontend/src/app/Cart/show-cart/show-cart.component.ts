import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-show-cart',
  templateUrl: './show-cart.component.html',
  styleUrls: ['./show-cart.component.scss']
})
export class ShowCartComponent implements OnInit {

  cartList!:any;
  selected = 1;
  total:number =0;
  constructor(private cartService:CartService,private alertify:AlertifyService){
    
  }
  ngOnInit(): void {
   this.getCart();
  }
  //get cart by user id
  getCart(){
    this.cartService.getCart().subscribe((cart:any)=>{
      this.cartList = cart;
      this.total = this.finishPrice(cart)
    })
  }

  changeQuantity(product:any,quantityInString:string){
    this.cartService.changeQuantity(product.productId._id,parseInt(quantityInString)).subscribe(()=>{
      //update row product price
      product.total = product.productId.price * parseInt(quantityInString);
      //update cart total cart price and details 
      this.getCart();
    })
  }
  //delete product from cart
  deleteProductFromCart(productId:string){
    this.cartService.removeFromCart(productId).subscribe((cart:any)=>{
      //update cart total price and details 
      this.alertify.success('product deleted')
      this.getCart();
    })
  }
  //calculate total price
   finishPrice(cart:any){
    this.total = 0;
    for(let i = 0; i< cart.length;i++){
      this.total += cart[i].total;
    }
    return this.total;
  }
}
