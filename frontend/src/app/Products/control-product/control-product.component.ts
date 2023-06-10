import { Component } from '@angular/core';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-control-product',
  templateUrl: './control-product.component.html',
  styleUrls: ['./control-product.component.scss']
})
export class ControlProductComponent {

  products:any;
  constructor(private productsService:ProductService,private alertify:AlertifyService){
    productsService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

  //delete product by id
  deleteProduct(id:string){
    this.productsService.DeleteProduct(id).subscribe(()=>{
      this.alertify.success('product deleted');
      this.products = this.products.filter((product:any)=> product._id != id);
    })
  }
}
