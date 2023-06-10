import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product:any;

  constructor(private cartService:CartService,private router:Router){    
  }

  //add product by id to cart
  addToCart(productId:string)
  {
    this.cartService.addToCart(productId).subscribe(()=>{
      this.router.navigateByUrl('/cart')
    })
  }
}
