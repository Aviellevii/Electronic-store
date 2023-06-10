import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { PcategoryService } from 'src/app/Services/pcategory.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  product:any;
  id!:string;
  editProduct!:FormGroup;
  isSubmitted:boolean = false;
  file!:File;
  categoires:any;
  constructor(private productService:ProductService,route:ActivatedRoute,private fb:FormBuilder,private router:Router,private alertify:AlertifyService,private pcategory:PcategoryService){
    //get id product from url
    route.params.subscribe((param)=>{
      this.id = param.id;
    })
    pcategory.getAllcategory().subscribe((category) => {
      this.categoires = category;
    })
    //get product by id
    this.productService.getProduct(this.id).subscribe((product)=>{
      this.product = product
      //put product value in form control
      this.editProduct = this.fb.group({
        title:[this.product.title,[Validators.required]],
        description:[this.product.description,[Validators.required]],
        price:[this.product.price,[Validators.required]],
        category:[this.product.category?._id,[Validators.required]],
        brand:[this.product.brand,[Validators.required]],
        quantity:[this.product.quantity,[Validators.required]],
        file:[''],
        color:[this.product.color,[Validators.required]],
      })
    })
   
  }

  get fc(){
    return this.editProduct.controls;
  }

  onFileSelect(event:any) {
    this.file = <File>event.target.files[0];
    this.editProduct.get('file')!.setValue(this.file);
  }

  submit(){
    this.isSubmitted = true;
    if(!this.editProduct.valid) return;

    const fv = this.editProduct.value;

    const formData = new FormData();
    //if you check image to change
    if(fv.file !== ''){
      formData.append("file",this.file);
    }
    //append value to form data
    formData.append('title',fv.title);
    formData.append('description',fv.description);
    formData.append('price',fv.price);
    formData.append('category',fv.category);
    formData.append('brand',fv.brand);
    formData.append('quantity',fv.quantity);
    formData.append('color',fv.color);

    //edit product by id
    this.productService.EditProduct(this.id,formData).subscribe(()=>{
      this.alertify.success('product updated');
      this.router.navigateByUrl('/');
    })
  }
}
