import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PcategoryService {
  private readonly baseUrl;

  constructor(private http:HttpClient) { 
    this.baseUrl = 'http://localhost:3000/api/pcategoty';
  }

  getAllcategory():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
  getCategory(id:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  addCategory(title:string){
    return this.http.post(`${this.baseUrl}`,{title});
  }
  updateCategory(id:string,title:string){
    return this.http.patch(`${this.baseUrl}/${id}`,{title});
  }
  deleteCategory(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
