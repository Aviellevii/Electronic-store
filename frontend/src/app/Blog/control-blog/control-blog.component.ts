import { Component } from '@angular/core';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-control-blog',
  templateUrl: './control-blog.component.html',
  styleUrls: ['./control-blog.component.scss']
})
export class ControlBlogComponent {
  blogs:any;
  constructor(private blogsService:BlogService){
    blogsService.getBlogs().subscribe(blogs => {
      this.blogs = blogs;
    })
  }

  deleteProduct(id:string){
    this.blogsService.DeleteBlog(id).subscribe(()=>{
      this.blogs = this.blogs.filter((blog:any)=> blog.id != id);
    })
  }
}
