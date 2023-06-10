import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent {
  blog:any;
  id!:string;
  editBlog!:FormGroup;
  isSubmitted:boolean = false;
  file!:File;
  constructor(private blogService:BlogService,private route:ActivatedRoute,private fb:FormBuilder,private router:Router){
    route.params.subscribe((param)=>{
      this.id = param.id;
    })
    this.blogService.getBlog(this.id).subscribe((blog)=>{
      this.blog = blog
      this.editBlog = this.fb.group({
        title:[this.blog.title,[Validators.required]],
        description:[this.blog.description,[Validators.required]],
        category:[this.blog.category,[Validators.required]],
     
        file:[''],
      })
    })
   
  }

  get fc(){
    return this.editBlog.controls;
  }

  onFileSelect(event:any) {
    this.file = <File>event.target.files[0];
    this.editBlog.get('file')!.setValue(this.file);
  }

  submit(){
    this.isSubmitted = true;
    if(!this.editBlog.valid) return;

    const fv = this.editBlog.value;

    const formData = new FormData();
    //if you check image to change
    if(fv.file !== ''){
      formData.append("file",this.file,this.file.name);
    }
    
    formData.append('title',fv.title);
    formData.append('description',fv.description);
    formData.append('category',fv.category);

    this.blogService.EditBlog(this.id,formData).subscribe(()=>{
      alert('product updated');
      this.router.navigateByUrl('/');
    })
  }
}
