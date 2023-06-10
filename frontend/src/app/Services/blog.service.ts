import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private readonly baseUrl;
  constructor(private http:HttpClient) { 
    this.baseUrl = 'http://localhost:3000/api/blog';
  }

  getBlogs():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`);
  }
  getBlog(id:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  createBlog(product:any){
    return this.http.post(`${this.baseUrl}`,product);
  }
  DeleteBlog(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  EditBlog(id:string,blog:any){
    return this.http.patch(`${this.baseUrl}/${id}`,blog);
  }

  liked(id:any){
    return this.http.put(`${this.baseUrl}/liked`,{blogId:id});
  }
  disliked(id:any){
    return this.http.put(`${this.baseUrl}/disliked`,{blogId:id});
  }
}
