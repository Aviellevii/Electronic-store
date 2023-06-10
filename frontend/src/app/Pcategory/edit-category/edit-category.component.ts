import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { PcategoryService } from 'src/app/Services/pcategory.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {
  category:any;
  id!:string;
  constructor(private pcategory:PcategoryService,route:ActivatedRoute, private alertify:AlertifyService,private router:Router){
    route.params.subscribe((params)=>{
      this.id = params.id
    })
    pcategory.getCategory(this.id).subscribe((category) => {
      this.category = category;
    })
  }

  Edit(title:string){
    this.pcategory.updateCategory(this.id,title).subscribe(_ =>{
      this.alertify.success('category update');
      this.router.navigateByUrl('/show-category');
    })
  }
}
