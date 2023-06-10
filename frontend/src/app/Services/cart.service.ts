import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly api;
  constructor(private http:HttpClient) {
    this.api = 'http://localhost:3000/api/cart'
   }

  addToCart(productId: string) {
    return this.http.post(`${this.api}`,{productId:productId,quantity:1});
  }

  changeQuantity(productId: string,quantity:number){
    return this.http.put(`${this.api}/change-quantity`,{productId:productId,quantity:quantity});
  }
  removeFromCart(productId: string) { 
    return this.http.delete(`${this.api}/delete-product/${productId}`);
  }
  getCart(){
    return this.http.get(`${this.api}`);
  }
  deleteCart(){
    return this.http.delete(`${this.api}/delete-cart`);
  }

}
