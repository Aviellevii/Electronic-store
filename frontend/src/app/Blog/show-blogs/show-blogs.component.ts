import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { BlogService } from 'src/app/Services/blog.service';

@Component({
  selector: 'app-show-blogs',
  templateUrl: './show-blogs.component.html',
  styleUrls: ['./show-blogs.component.scss']
})
export class ShowBlogsComponent {
  blogs:any;
  constructor(private blogService:BlogService,private router:Router){
    blogService.getBlogs().subscribe((blogs)=>{
      this.blogs = blogs;
    })
  }

  numView(blog:any){
    this.blogService.getBlog(blog.id).subscribe(()=>{
      blog.numViews +=1;
    })
  }

  onRate($event:{newValue:number}) {
    alert(` 
      New Value: ${$event.newValue}`);
  }
  liked(blog:any){
    this.blogService.liked(blog._id).subscribe(()=>{
      if(blog.isDisLiked) blog.isDisLiked = !blog.isDisLiked
      blog.isLiked = !blog.isLiked
    })
  }
  disliked(blog:any){
    this.blogService.disliked(blog._id).subscribe(()=>{
      if(blog.isLiked) blog.isLiked = !blog.isLiked
      blog.isDisLiked = !blog.isDisLiked
    })
  }
}