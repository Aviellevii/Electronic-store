import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly api;

  constructor(private http:HttpClient) {
    this.api = 'http://localhost:3000/api/order'
   }
   
   createOrder(order:any){
    return this.http.post(`${this.api}/create-order`,order);
   }

   getOrder(){
    return this.http.get(`${this.api}/get-order`);
   }
   pay(order:any){
    return this.http.post(`${this.api}/pay`,order);

   }
}
