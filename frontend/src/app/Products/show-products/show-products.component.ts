import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PcategoryService } from 'src/app/Services/pcategory.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent {

  products:any;
  categories:any;
  constructor(productService:ProductService,pcategoty:PcategoryService,route:ActivatedRoute){
    let productsObservalbe:Observable<any>;
    
    route.params.subscribe((params)=>{
      if(params.tagname){
        productsObservalbe = productService.getByCategory(params.tagname); 
      }
      else{
        productsObservalbe = productService.getAllProducts();
      }
      productsObservalbe.subscribe((products)=>{
      
        this.products = products;
      })
    })
    pcategoty.getAllcategory().subscribe((categoties)=>{
      this.categories = categoties;
    })
  }
}
