import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl;
  constructor(private http:HttpClient) { 
    this.baseUrl = 'http://localhost:3000/api/product';
  }

  getAllProducts():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // getWishList():Observable<any[]>{
  //   return this.http.get<any[]>(`${this.baseUrl}/get`);
  // }
  getProduct(id:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  createProduct(product:any){
    return this.http.post(`${this.baseUrl}`,product);
  }
  DeleteProduct(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  EditProduct(id:string,product:any){
    return this.http.patch(`${this.baseUrl}/${id}`,product);
  }
  getByCategory(category:string){
    return this.http.get(`${this.baseUrl}/tag/${category}`)
  }
  // AddProd(id:any){
  //   return this.http.put(`${this.baseUrl}/add`,{propId:id});
  // }
}
