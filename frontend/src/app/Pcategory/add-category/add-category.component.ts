import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { PcategoryService } from 'src/app/Services/pcategory.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  constructor(private pcategoryService:PcategoryService,private alertify:AlertifyService,private router:Router){

  }

  create(title:string){
    this.pcategoryService.addCategory(title).subscribe(_ =>{
      this.alertify.success('category added');
      this.router.navigateByUrl('/show-category');
    })
  }
}
