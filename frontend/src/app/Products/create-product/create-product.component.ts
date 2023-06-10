import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { PcategoryService } from 'src/app/Services/pcategory.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  createProductForm!:FormGroup;
  isSubmitted:boolean = false;
  file!:File;
  categoires:any;
  constructor(private productService:ProductService,fb:FormBuilder,private router:Router,private alertify:AlertifyService,private pcategory:PcategoryService){
    pcategory.getAllcategory().subscribe((category) => {
      this.categoires = category;
    })

    this.createProductForm = fb.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]],
      price:['',[Validators.required]],
      category:['',[Validators.required]],
      brand:['',[Validators.required]],
      quantity:['',[Validators.required]],
      file:[null,[Validators.required]],
      color:['',[Validators.required]],
    })
  }

  get fc(){
    return this.createProductForm.controls;
  }

  //get file from form control
  onFileSelect(event:any) {
    this.file = <File>event.target.files[0];
    this.createProductForm.get('file')!.setValue(this.file);
  }

  submit(){
    this.isSubmitted = true;
    if(!this.createProductForm.valid) return;
 
    const fv = this.createProductForm.value;

    const formData = new FormData();
    //append data to form data
    formData.append("file",this.file);
    
    formData.append('title',fv.title);
    formData.append('description',fv.description);
    formData.append('price',fv.price);
    formData.append('category',fv.category);
    formData.append('brand',fv.brand);
    formData.append('quantity',fv.quantity);
    formData.append('color',fv.color);

    //create new product
    this.productService.createProduct(formData).subscribe(()=>{
      this.router.navigateByUrl("/")
      this.alertify.success('product created')
    })
  }
}
