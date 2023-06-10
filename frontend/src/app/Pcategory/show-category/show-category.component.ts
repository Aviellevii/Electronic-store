import { Component } from '@angular/core';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { PcategoryService } from 'src/app/Services/pcategory.service';
@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.scss']
})
export class ShowCategoryComponent {
  categories:any;
  constructor(private pcategory:PcategoryService,private alertify:AlertifyService){
    pcategory.getAllcategory().subscribe(category=>{
      this.categories = category;
    })
  }

  deleteCategory(id:string){
    this.pcategory.deleteCategory(id).subscribe(() => {
      console.log(this.categories)
      this.alertify.success('category deleted')
      this.categories = this.categories.filter((category:any) => category._id != id);
      console.log(this.categories)
    })
  }
}
