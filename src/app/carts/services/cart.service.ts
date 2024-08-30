import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from '../../shared/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService { 


  constructor(private http:HttpClient) {

   } 
   getSingleProduct(id:number):Observable<Iproduct>{
    return this.http.get<Iproduct>(`https://fakestoreapi.com/products/${id}`);
      }
     
   addCart(model:any){
return this.http.post<any>(`https://fakestoreapi.com/carts` ,model );

   }   
}
