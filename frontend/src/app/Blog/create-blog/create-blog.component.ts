import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent {
  createBlogForm!:FormGroup;
  isSubmitted:boolean = false;
  file!:File;
  constructor(private blogService:BlogService,private route:ActivatedRoute,private fb:FormBuilder,private router:Router){
    this.createBlogForm = fb.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]],
      category:['',[Validators.required]],
      file:['',[Validators.required]],
    })
  }    

  get fc(){
    return this.createBlogForm.controls;
  }


  onFileSelect(event:any) {
    this.file = <File>event.target.files[0];
    this.createBlogForm.get('file')!.setValue(this.file);
  }

  submit(){
    this.isSubmitted = true;
    if(!this.createBlogForm.valid) return;

    
    const fv = this.createBlogForm.value;

    const formData = new FormData();
    formData.append("file",this.file,this.file.name);
    formData.append('title',fv.title);
    formData.append('description',fv.description);
    formData.append('category',fv.category);
    this.blogService.createBlog(formData).subscribe(()=>{
      this.router.navigateByUrl("/show-blogs")
    })
  }
}
